import {GetServerSideProps} from 'next';

import {Route} from '~/constants';

const enforceNotAuthenticated: () => GetServerSideProps = () => {
  return async (context) => {
    const supabaseToken = context.req.cookies['sb-access-token'];

    if (supabaseToken) {
      return {
        props: {},
        redirect: {
          destination: Route.Home,
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  };
};

export default enforceNotAuthenticated;
