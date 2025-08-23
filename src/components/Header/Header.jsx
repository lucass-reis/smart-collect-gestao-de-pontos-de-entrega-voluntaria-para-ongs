import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <div className="logo">Smart Collect</div>
            <nav>
            <ul>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#caracteristicas">Características</a></li>
                <li><a href="#depoimentos">Depoimentos</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
            </nav>
        </header>
    );
}