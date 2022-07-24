import { FC, InputHTMLAttributes,ButtonHTMLAttributes } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    type?: "button" | "reset" | "submit"
}

export const Input: FC<InputProps> = ({ name,placeholder,type,onClick, ...rest }) => {
    return (
        <div className={styles.inputContainer} >
            <input
                name={name}
                id={name}
                placeholder={placeholder}
                {...rest}
                type="text"
                autoComplete="off"
            >
            </input>
            <button type={type} onClick={onClick} aria-label="search repository">
                <AiOutlineSearch size={15} />
            </button>
        </div>
    );
}

