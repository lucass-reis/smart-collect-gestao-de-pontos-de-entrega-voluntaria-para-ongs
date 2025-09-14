import Logo from '../logo/Logo';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <nav>
            <ul>
                <li><a href="#contato">Contato</a></li>
                <li><a href="#contato">Encontre um PEV</a></li>
            </ul>
            </nav>
        </header>
    );
}