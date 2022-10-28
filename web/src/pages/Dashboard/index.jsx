import { useEffect, useState } from 'react'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import axios from 'axios'
import { format, formatISO } from 'date-fns'

import { Icon, Card, DateSelect } from "~/components"

export const Dashboard = () => {
    
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))

    // Pega user e password armazenado no browser
    const [auth] = useLocalStorage('auth', {})

    const [hunches, fetchHunches] = useAsyncFn(async () => {
        const res = await axios ({
            method: 'get',
            baseURL: 'http://localhost:3000',
            url: `/${auth.user.username}`
        })
        const hunches = res.data.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})

        return hunches
    })
    
    // Busca todos os jogos da API
    const [games, fechGames] = useAsyncFn( async (params) => {
        const res = await axios ({
            method: 'get',
            baseURL: 'http://localhost:3000',
            url: '/games',
            params
        })
        return res.data
    })

    // Verifica se todas as informações estão carregadas para montar o card
    const isLoading = games.loading || hunches.loading
    const hasError =  games.error || hunches.error
    const isDone = !isLoading && !hasError     


    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fechGames({ gameTime: currentDate })
    }, [currentDate])

    // Se não tiver logado vai para home "/"
    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }
    
    return (
        <>
            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/images/logo-fundo-vermelho.svg" className="w-28 md:w-40"/> 
                    <a href={`/${auth?.user?.username}`}>
                        <Icon name="profile" className="w-10" />
                    </a>
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <span>Olá Wanderson</span>
                        <h3 className="text-2xl font-bold">
                            Qual é o seu palpite?
                        </h3>
                    </div>
                </section>
                    
                <section id="content" className="container max-w-3xl p-4 space-y-4">
                    {/** Recebe a data inicial que vem do estado (useState)  */}
                    <DateSelect currentDate={currentDate} onChange={setDate} />
                    
                    <div className="space-y-4">
                        
                        {/** Se loading mostra carregando jogos  */}
                        {isLoading && 'Carregando jogos...'}
                        
                        {/** Se deu erro em loading mostra msn de erro  */}
                        {hasError && 'Ops! Algo deu errado'}
                        
                        {/** Se terminou o loading e não deu erro, Renderiza na tela todos os jogos da API  */}
                        {isDone && games.value?.map(game => (
                            <Card
                                key={game.id}
                                gameId={ game.id }
                                homeTeam={ game.homeTeam }
                                awayTem={ game.awayTeam }
                                gameTime={ format(new Date(game.gameTime), 'HH:mm') }
                                homeTeamScore={hunches?.value?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={hunches?.value?.[game.id]?.awayTeamScore || ''}
                            />
                        ))}
                        
                    </div>
                </section>
            </main>
        </>
    )
}
