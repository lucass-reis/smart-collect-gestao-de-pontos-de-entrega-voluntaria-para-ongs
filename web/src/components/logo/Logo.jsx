import styles from './Logo.module.css';

export default function Logo() {
    return (
        <a href="/" className={styles.link}>
            <div className={styles.flex}>
                <img src="src\assets\logo.svg" alt="Logo da Smart Collect" />
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
    )
}