
import { FC, SelectHTMLAttributes } from 'react';
import Image from 'next/image'

import { Button } from '../Button';
import styles from './styles.module.scss'
import { Dropdown, MetaDataType } from '../Dropdown';


interface RepositoryItemProps extends SelectHTMLAttributes<HTMLSelectElement>  {
    srcImage: string;
    descriptionRepository: string;
    linkPerfil: string;
    loginUser: string;
    branches_url?: string;

    title: string;
    onClick: () => void;
    variant?: 'dropdown' | 'simple' 
    metaData?: MetaDataType[];

    htmlID?: string;
    label?: string;
    textButton?: string;
    variantButton?: "outline" | "solid";
}

export const RepositoryItem: FC<RepositoryItemProps> = ({variantButton = 'outline',textButton, srcImage,branches_url,metaData,htmlID,label, variant = '', loginUser, descriptionRepository, linkPerfil, title, onClick, ...rest }) => {

    return (
        <li className={styles.repository_item_container}>
            <div className={styles.repository_perfil}>

                <a href={linkPerfil} target="_blank" rel="noreferrer">
                    <Image
                        alt="profile image"
                        src={srcImage}
                        width={100}
                        height={100}
                        quality={70}
                    />
                </a>
                <h5>{loginUser}</h5>
            </div>
            <div className={styles.repository_content}>
                <h4>
                    {title}
                </h4>
                <span>
                    {descriptionRepository ? descriptionRepository : 'Nenhuma descrição foi informada para este repositório'}
                </span>
                <div className={styles.repository_action} data-variant={variant}>
                    {variant == 'dropdown' &&
                        <Dropdown
                            metaData={metaData}
                            htmlID={htmlID}
                            {...rest }
                            
                        />
                    }
                    { variant != 'simple' && <Button variant={variantButton} onClick={onClick}>{textButton}</Button>}
                </div>
            </div>
        </li>
    );
}

