import { FC, InputHTMLAttributes } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
}

export const Input: FC<InputProps> = ({ name,placeholder, ...rest }) => {
    return (
        <div className={styles.inputContainer} >
            <input
                name={name}
                id={name}
                placeholder={placeholder}
                {...rest}
            >
            </input>
            <button type="button">
                <AiOutlineSearch size={15} />
            </button>
        </div>
    );
}

