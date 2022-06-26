import React, {useMemo} from 'react';

import {Navigation} from '~/constants';
import {HeaderUser, Link} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const navigationLinks = useMemo(
    () =>
      Navigation.map(({name, route, Icon}) => (
        <Link
          to={route}
          key={route}
          className="text_medium"
          activeClassName={styles.container__inner__nav__items_active}>
          <span>{name}</span>
          <div>
            <Icon />
          </div>
        </Link>
      )),
    [],
  );

  return (
    <header className={styles.container}>
      <div className={styles.container__inner}>
        <div className={styles.container__inner__nav}>
          <nav className={styles.container__inner__nav__items}>
            {navigationLinks}
          </nav>
        </div>

        <div className={styles.container__user}>
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
