import { useEffect, useState } from 'react'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import { format, formatISO } from 'date-fns'

import { Icon, Card, DateSelect } from "~/components"


export const Profile = () => {

    const params = useParams()

    // useNavigate -> Se o usuario estiver logado, ao clicar em Sair ele redireciona para onde desejamos
    const navigate = useNavigate()

    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))

    // Pega user e password armazenado no browser
    const [auth, setAuth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error}, fetchHunches] = useAsyncFn(async () => {
        const res = await axios ({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`
        })
        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})

        return {
            ...res.data,
            hunches
        }
    })
    
    // Busca todos os jogos da API
    const [games, fechGames] = useAsyncFn( async (params) => {
        const res = await axios ({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })
        return res.data
    })

    const logout = () => {
        setAuth({})
        navigate('/login')
    }

    // Verifica se todas as informações estão carregadas para montar o card
    const isLoading = games.loading || loading
    const hasError =  games.error || error
    const isDone = !isLoading && !hasError   


    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fechGames({ gameTime: currentDate })
    }, [currentDate])
    
    return (
        <>
            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/images/logo-fundo-vermelho.svg" className="w-28 md:w-40"/> 
                    
                    {/** Se estiver logado mostra o botão Sair, se não estiver não mostra o botão */}
                    {auth?.user?.id && (
                        <div onClick={logout} className="p-2 cursor-pointer font-bold">
                            Sair
                        </div>
                    )}
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10" />   
                        </a>
                        <h3 className="text-2xl font-bold">
                            { user?.name }
                        </h3>
                    </div>
                </section>
                    
                <section id="content" className="container max-w-3xl p-4 space-y-4">

                    <h2 className="text-red-500 text-xl font-bold">Seus palpites</h2>
                    
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
                                awayTeam={ game.awayTeam }
                                gameTime={ format(new Date(game.gameTime), 'HH:mm') }
                                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore.toString() || '0'}
                                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore.toString() || '0'}
                                disabled={true}
                            />
                        ))}
                        
                    </div>
                </section>
            </main>
        </>
    )
}
