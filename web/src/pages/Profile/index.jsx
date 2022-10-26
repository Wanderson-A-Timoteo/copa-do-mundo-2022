import { useState, useEffect } from 'react'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import axios from 'axios'
import { format } from 'date-fns'
import { formatISO } from 'date-fns/esm'

import { Icon, Card, DateSelect } from "~/components"


export const Profile = () => {

    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    
    const [auth, setAuth] = useLocalStorage('auth', {})

    
    // Busca todos os jogos da API
    const [state, doFetch] = useAsyncFn( async (params) => {
        const res = await axios ({
            method: 'get',
            baseURL: 'http://localhost:3000',
            url: '/games',
            params
        })
        return res.data
    })
        
    useEffect(() => {
        doFetch({ gameTime: currentDate })
    }, [currentDate])
    

    // Se estiver deslogado vai para login "/"
    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }
    
    return (
        <>
            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl flex justify-between p-4">
                    <img src="/images/logo-fundo-vermelho.svg" className="w-28 md:w-40"/> 
                    <div onClick={() => setAuth({})} className="p-2 cursor-pointer font-bold">
                        Sair
                    </div>
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className="bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10" />   
                        </a>
                        <h3 className="text-2xl font-bold">
                            { auth.user.name }
                        </h3>
                    </div>
                </section>
                    
                <section id="content" className="container max-w-3xl p-4 space-y-4">

                    <h2 className="text-red-500 text-xl font-bold">Seus palpites</h2>
                    
                    {/** Recebe a data inicial que vem do estado (useState)  */}
                    <DateSelect currentDate={currentDate} onChange={setDate} />
                    
                    <div className="space-y-4">
                        
                        {/** Se loading mostra carregando jogos  */}
                        {state.loading && 'Carregando jogos...'}
                        
                        {/** Se deu erro em loading mostra msn de erro  */}
                        {state.error && 'Ops! Algo deu errado'}
                        
                        {/** Se terminou o loading e não deu erro, Renderiza na tela todos os jogos da API  */}
                        {!state.loading && !state.error && state.value?.map(game => (
                            <Card
                                key={game.id}
                                gameId={ game.id }
                                homeTeam={ game.homeTeam }
                                awayTem={ game.awayTeam }
                                gameTime={ format(new Date(game.gameTime), 'HH:mm') }
                            />
                        ))}
                        
                    </div>
                </section>
            </main>
        </>
    )
}
