import React, {useRef} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import usePortal from 'react-useportal';

import {Route} from '~/constants';
import supabase from '~/lib/supabase';
import {Typography} from '~/components';
import {useOnClickOutside} from '~/hooks';
import {LogoutIcon, DownIcon} from '~/assets';

import styles from './HeaderUser.module.scss';

const Avatar = dynamic(() => import('react-avatar'), {
  ssr: false,
});

const HeaderUser: React.FC = () => {
  const userRef = useRef(null);
  const {openPortal, closePortal, isOpen, Portal} = usePortal();

  const user = supabase.auth.user();
  const userName = user?.user_metadata?.name;

  useOnClickOutside(userRef, closePortal, true);

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();

    Router.push(Route.SignIn);
  };

  return (
    <React.Fragment>
      <div
        role="button"
        ref={userRef}
        data-dropdown="true"
        className={styles.user}
        onClick={!isOpen ? openPortal : closePortal}>
        <Avatar name={userName || user?.email} size="44" round="50%" />
        <DownIcon
          className={styles.user__arrow}
          style={{
            transform: `rotate(${isOpen ? 180 : 0}deg)`,
          }}
        />
      </div>

      {isOpen && (
        <Portal>
          <div className={styles.box}>
            <div className={styles.box__content}>
              <div className={styles.box__content__header}>
                <div>
                  <h1 className={styles.box__content__header__name}>
                    {user?.email}
                  </h1>
                  <Typography
                    variant="Heading"
                    type="Medium"
                    className={styles.box__content__header__validator}>
                    {userName}
                  </Typography>
                </div>
                <div
                  role="button"
                  onClick={handleLogoutClick}
                  className={styles.box__content__header__logout}>
                  <LogoutIcon />
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
};

export default HeaderUser;
