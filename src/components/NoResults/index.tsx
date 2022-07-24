import styles from './styles.module.scss'

export const NoResults = () => {
    return (
        <div className={styles.noResults}>
            <span>
                ( ; - ; )
            </span>
            <h5>Nada encontrado</h5>
        </div>
    );
}

