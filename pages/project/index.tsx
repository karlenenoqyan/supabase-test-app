import {NextPage} from 'next';

import {Seo} from '~/components';
import {CreateProject} from '~/containers';
import {enforceAuthenticated} from '~/utils';

const CreateProjectPage: NextPage = () => (
  <Seo title="Create project" metaDescription="Create project page description">
    <CreateProject />
  </Seo>
);

export const getServerSideProps = enforceAuthenticated();

export default CreateProjectPage;
