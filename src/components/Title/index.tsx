import { FC, HTMLAttributes } from 'react';

import styles from './styles.module.scss'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: 'full' | 'partial' | 'inline'
}

export const Title: FC<TitleProps> = ({ children, ...rest }) => {
  return (
    <header className={styles.title}>
      <div />
      <h4>{children}</h4>
    </header>
  );
}

