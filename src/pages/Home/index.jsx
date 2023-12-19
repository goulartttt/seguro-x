import './home.css';
import NavBar from '../../componentes/Navbar';

const Home = () => {
    return (
        <>
            <header className='cabeca-home'>
                <NavBar />
                <div className= 'header-home'>
                    <div className='bem-vindo'>
                        <h1> Bem-Vindo à Vayon </h1>
                        <p>Na Vayon, não somos apenas uma seguradora; somos seus parceiros dedicados na jornada da vida. Embarque conosco em uma experiência única, onde valores fundamentais, inovação e compromisso com o cliente moldam nossa identidade.</p>
                    </div>
                </div>
            </header>

            <main className='corpo-home'>
                <div className='main-home'>
                    <div className='conteudo-home'>
                        <h1>Quem Somos?</h1>
                        <p>A Vayon Insurance Solutions é mais do que uma seguradora; somos seus parceiros dedicados na jornada da vida. Nosso compromisso é ir além de simples apólices e números, oferecendo soluções de seguro que refletem verdadeiramente suas necessidades únicas. Seja você um indivíduo ou uma família, estamos aqui para fornecer a segurança financeira de que você precisa, quando mais precisa.</p>
                    </div>
                    <div className='conteudo-home'>
                        <h1>Nossa História</h1>
                        <p>Desde o nosso início em 2020, a Vayon tem desempenhado um papel fundamental no setor de seguros, construindo uma trajetória sólida baseada em valores fundamentais. Nossa história é marcada por anos de compromisso, inovação e um foco inabalável em nossos clientes. Crescemos para nos tornar uma seguradora de confiança, conhecida por oferecer serviços excepcionais e soluções personalizadas.</p>
                    </div>
                    <div className='conteudo-home'>
                        <h1>Nosso Compromisso com Você</h1>
                        <p>Na Vayon, entendemos que cada jornada é única, e é por isso que adaptamos nossos serviços para atender às suas necessidades específicas. Nosso compromisso é ser mais do que uma seguradora comum; somos seu apoio em todos os momentos da vida. Ao escolher a Vayon Insurance Solutions, você opta por uma parceria sólida, centrada em valores e orientada para o cliente.</p>
                    </div>
                </div>
                <div className='coberturas-home-2'>    
                    <div className='titulo-descricao-cobertura'>
                        <h1>Coberturas</h1>
                    </div>
                    <div className='coberturas-container'>
                            <div className='descricao-cobertura'>
                                <h1>Cobertura de Morte por Qualquer Causa</h1>
                                <p>Esta cobertura oferece proteção financeira em caso de falecimento do segurado por qualquer causa. Garante que a família e os beneficiários recebam um valor definido, ajudando a enfrentar despesas relacionadas ao óbito. Os valores mínimos de cobertura começam em R$5.000,00, proporcionando uma base de suporte, enquanto os valores máximos podem chegar a até R$800.000,00, oferecendo uma amplitude de escolha que se adequa às necessidades individuais.</p>
                            </div>
                            <div className='descricao-cobertura'>
                                <h1>Cobertura de Invalidez Total e Permanente (ITP)</h1>
                                <p>Essa cobertura visa proteger o segurado em caso de invalidez total e permanente, proporcionando benefícios financeiros que auxiliam na adaptação à nova realidade. Com valores mínimos de cobertura a partir de R$5.000,00, a cobertura oferece suporte financeiro consistente. Os valores máximos de até R$500.000,00 garantem uma proteção substancial para enfrentar os desafios associados à invalidez.</p>
                            </div>
                            <div className='descricao-cobertura'>
                                <h1>Cobertura de Doença Terminal</h1>
                                <p>Esta cobertura abrange situações de doenças terminais, proporcionando apoio financeiro em momentos difíceis. Com valores mínimos de cobertura iniciando em R$5.000,00, a cobertura busca aliviar as preocupações financeiras durante o enfrentamento de condições terminais. Os valores máximos de até R$1.000.000,00 oferecem uma amplitude de opções para atender às diversas necessidades de cobertura diante de circunstâncias desafiadoras.</p>
                            </div>
                        </div>
                </div>
            </main>

            <footer className='footer'></footer>
        </>
    )
}

export default Home