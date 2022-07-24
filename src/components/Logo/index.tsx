
import { FC, HtmlHTMLAttributes } from 'react';
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface LogoProps extends HtmlHTMLAttributes<HTMLHeadingElement> {

    variant: 'full' | 'partial' | 'inline'
}

export const Logo: FC<LogoProps> = ({ variant, ...rest }) => {
    const router = useRouter();

    function handleGoToHomePage() {
        router.push('/')
    }

    return (
        <a className={styles.logoContainer} data-variant={variant} onClick={handleGoToHomePage}>
            <h1 {...rest}>REPOS.IO</h1>
            {variant != 'inline' && <h2>Sua busca. Seu repositório. Apenas para você.</h2>}
        </a>
    );
}

