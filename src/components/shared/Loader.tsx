import styles from './Loader.module.css'

interface LoaderProps {
    size?: number;
    label?: string;
    fullPage?: boolean;
}

export default function Loader({ size = 56, label = 'Loading', fullPage = false }: LoaderProps) {    const spinner = (
        <div className={styles.loader} role='status' aria-live='polite'>
            <svg 
            viewBox='0 0 24 24' width={size} height={size} 
            fill='none' stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round' strokeLinejoin='round' aria-hidden="true">
                <circle className={styles.dot1} cx="6" cy="14" r="1"/>
                <circle className={styles.dot2} cx="12" cy="12" r="1"/>
                <circle className={styles.dot3} cx="18" cy="10" r="1"/>
            </svg>
            <span className={styles.srOnly}>
                {label}
            </span>
        </div>
        
    );
     return fullPage ? <div className={styles.fullPage}>{spinner} </div> : spinner;

}
