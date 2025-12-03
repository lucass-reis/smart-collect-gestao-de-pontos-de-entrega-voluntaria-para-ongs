import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
            <p>&copy; 2025 Smart Collect. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}