import { Icon, Card } from "~/components"


export const Dashboard = () => (
    <div className="">
        <header className="bg-red-500 text-white p-4">
            <div className="container max-w-3xl flex justify-between p-4">
                <img src="/images/logo-fundo-vermelho.svg" className="w-28 md:w-40"/> 
                <a href="/profile">
                    <Icon name="profile" className="w-10" />
                </a>
            </div>
        </header>

        <main className="">
            <section id="header" className="bg-red-500 text-white">
                <div className="container max-w-3xl space-y-2 p-4">
                    <span>Olá Wanderson</span>
                    <h3 className="text-2xl font-bold">
                        Qual é o seu palpite?
                    </h3>
                </div>
            </section>
                
            <section id="content" className="container max-w-3xl p-4">
                <Card
                    timeA={{ slug: 'sui' }}
                    timeB={{ slug: 'cam' }}
                    match={{ time: '07:00' }}
                />

                <Card
                    timeA={{ slug: 'uru' }}
                    timeB={{ slug: 'cor' }}
                    match={{ time: '10:00' }}
                />

                <Card
                    timeA={{ slug: 'por' }}
                    timeB={{ slug: 'gan' }}
                    match={{ time: '13:00' }}
                />

                <Card
                    timeA={{ slug: 'bra' }}
                    timeB={{ slug: 'ser' }}
                    match={{ time: '16:00' }}
                />
            </section>
        </main>
    </div>
)
