
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss'


interface RepositoryContainerProps extends HtmlHTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}

export const RepositoryContainer: FC<RepositoryContainerProps> = ({ children }) => {
    return (
        <ul className={styles.ListContainer}>
            {children}
        </ul>
    );
}

