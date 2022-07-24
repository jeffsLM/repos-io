/* eslint-disable @next/next/no-img-element */

import { FC, HtmlHTMLAttributes, InputHTMLAttributes } from 'react';
import { Input } from '../Input';
import { Logo } from '../Logo';
import styles from './styles.module.scss'

interface HeaderProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: 'full' | 'partial' | 'inline'
}

export const Header: FC<HeaderProps> = ({ variant, ...rest }) => {
  return (
    <header className={styles.hero} data-variant={variant}>
      <div className={styles.contentSearch}>
        <Logo variant={variant} />
        <Input
          name="search"
          placeholder="Pesquise por usuários do github"
          {...rest}
          type="submit"
        />
      </div>
      <div
        className={styles.contentAvatar}>
        <img
          src="/images/avatarSearch.svg"
          className={styles.avatarSearch}
          alt="Girl Searching" />
      </div>
    </header>
  );
}

