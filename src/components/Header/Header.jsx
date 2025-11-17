import Logo from '../logo/Logo';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg'

export default function Header({ children }) {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.link}>
                <div className={styles.flex}>
                    <img src={logo} alt="Logo da Smart Collect" />
                    <p className={styles.logoText}>
                        <span className={styles.logoGreenColor}>
                            Smart
                        </span> 
                        <span className={styles.logoBlueColor}>
                            Collect
                        </span>
                    </p>
                </div>
            </a>
            <nav>
            <ul>
                {children}
            </ul>
            </nav>
        </header>
    );
}