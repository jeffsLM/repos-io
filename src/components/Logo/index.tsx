
import { FC,HtmlHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface LogoProps extends HtmlHTMLAttributes<HTMLHeadingElement> {

    variant: 'full' | 'partial' | 'inline' 
}

export const Logo: FC<LogoProps> = ({ variant, ...rest }) => {
    return (
        <div className={styles.logoContainer} data-variant={variant}>
            <h1 {...rest}>REPOS.IO</h1>
            {variant == 'full' && <h2>Sua busca. Seu repositório. Apenas para você.</h2>}
        </div>
    );
}

