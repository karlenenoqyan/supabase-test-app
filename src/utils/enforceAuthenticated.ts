import {GetServerSideProps} from 'next';

import {Route} from '~/constants';
import supabase from '~/lib/supabase';

const enforceAuthenticated: () => GetServerSideProps = () => {
  return async (context) => {
    const {req} = context;
    const {user} = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      return {
        props: {},
        redirect: {
          destination: Route.SignIn,
        },
      };
    }

    return {
      props: {},
    };
  };
};

export default enforceAuthenticated;
