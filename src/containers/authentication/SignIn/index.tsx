import React, {useCallback} from 'react';
import {toast} from 'react-toastify';
import {UserCredentials} from '@supabase/supabase-js';

import supabase from '~/lib/supabase';
import {RouterService} from '~/services';
import {Route, signInForm} from '~/constants';
import {Typography, Form, Link} from '~/components';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  const handleSignInFormSubmit = useCallback(
    async (values: Pick<UserCredentials, 'email' | 'password'>) => {
      const {user, session, error} = await supabase.auth.signIn(values);

      if (user && session) {
        RouterService.push(Route.Home);
      }

      if (error) {
        toast.error(error.message);
      }
    },
    [],
  );

  return (
    <div className="container container__auth">
      <div className={styles.container__top}>
        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title}>
          Sign In
        </Typography>
      </div>

      <Form
        form={signInForm}
        submitText="Sign In"
        onSubmit={handleSignInFormSubmit}
      />

      <div className={styles.container__account}>
        <Typography
          variant="Text"
          type="Semibold"
          className={styles.container__account_reg}>
          Don’t have an account?
        </Typography>
        <Link to={Route.SignUp}>
          <Typography
            variant="Text"
            type="Medium"
            className={styles.container__account_sign}>
            Sign up
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
