import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "outline" | "solid" ;

}

export const Button: FC<ButtonProps> = ({ children,variant = "solid", ...rest }) => {
    return (
        <div className={styles.buttonContainer} data-variant={variant}>
            <button {...rest}  type="button" aria-label="more info">
                {children}
            </button>
        </div>
    );
}

