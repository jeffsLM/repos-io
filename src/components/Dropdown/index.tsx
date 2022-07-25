import { FC, SelectHTMLAttributes } from 'react';

import styles from './styles.module.scss'


export type MetaDataType = {
    commit: { url: string, sha: string, protected: boolean };
    name: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    metaData: MetaDataType[];
    htmlID: string;
}

export const Dropdown: FC<DropdownProps> = ({ htmlID, metaData, ...rest }) => {
    return (
        <div className={styles.dropdownContainer}>
            <select name={htmlID} id={htmlID} {...rest}>
                {metaData.map((item, index) => {
                    return <option key={index} value={item.commit.url}>{item.name}</option>
                })}
            </select>
        </div>
    );
}

