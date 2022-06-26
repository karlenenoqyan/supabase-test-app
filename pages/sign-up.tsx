import {NextPage} from 'next';

import {Seo} from '~/components';
import {SignUp} from '~/containers';
import {enforceNotAuthenticated} from '~/utils';

const SignUpPage: NextPage = () => (
  <Seo
    childrenOnly
    title="Sign Up"
    showHeader={false}
    metaDescription="Sign up page description">
    <SignUp />
  </Seo>
);

export const getServerSideProps = enforceNotAuthenticated();

export default SignUpPage;
