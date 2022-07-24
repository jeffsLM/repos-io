
import { FC, HtmlHTMLAttributes } from 'react';
import Image from 'next/image'

import { Button } from '../Button';
import styles from './styles.module.scss'


interface RepositoryItemProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
    srcImage: string;
    descriptionRepository: string;
    linkPerfil: string;
    loginUser: string;
    repositoryName: string;
    onClick: () => void;
}

export const RepositoryItem: FC<RepositoryItemProps> = ({ srcImage, loginUser, descriptionRepository, linkPerfil, repositoryName, onClick, ...rest }) => {

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
                    {repositoryName}
                </h4>
                <span>
                    {descriptionRepository ? descriptionRepository : 'Nenhuma descrição foi informada para este repositório'}
                </span>
                <div className={styles.repository_action}>
                    <Button variant='outline' onClick={onClick}>MAIS DETALHES</Button>
                </div>
            </div>
        </li>
    );
}

