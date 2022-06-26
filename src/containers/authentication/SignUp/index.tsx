import React, {useCallback} from 'react';

import supabase from '~/lib/supabase';
import {RouterService} from '~/services';
import {registrationForm, Route} from '~/constants';
import {Typography, Form, Button, Link} from '~/components';

import styles from './SignUp.module.scss';

const SignUp: React.FC = () => {
  const handleRegistrationSubmit = useCallback(
    async ({email, password, name}) => {
      const signInCredentials = {
        email,
        password,
      };
      const {user, error} = await supabase.auth.api.createUser({
        ...signInCredentials,
        email_confirm: true,
        user_metadata: {
          name,
        },
      });
      await supabase.auth.signIn(signInCredentials);

      if (user && !error) {
        RouterService.push(Route.Home);
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
          Registration
        </Typography>
      </div>

      <Form
        submitText="Register"
        form={registrationForm}
        onSubmit={handleRegistrationSubmit}
      />
      <div className={styles.container__back}>
        <Link to={Route.SignIn}>
          <Button variant="ghost" className={styles.container__back__button}>
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
