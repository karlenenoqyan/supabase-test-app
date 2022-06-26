import {NextPage} from 'next';

import {Seo} from '~/components';
import {SignIn} from '~/containers';
import {enforceNotAuthenticated} from '~/utils';

const SignInPage: NextPage = () => (
  <Seo
    childrenOnly
    showHeader={false}
    title="Sign In"
    metaDescription="Sign-in page description">
    <SignIn />
  </Seo>
);

export const getServerSideProps = enforceNotAuthenticated();

export default SignInPage;
