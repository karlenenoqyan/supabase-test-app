import {NextPage} from 'next';

import {Seo} from '~/components';
import {Projects} from '~/containers';
import {enforceAuthenticated} from '~/utils';

const ProjectsPage: NextPage = () => (
  <Seo title="Projects" metaDescription="Projects page description">
    <Projects />
  </Seo>
);

export const getServerSideProps = enforceAuthenticated();

export default ProjectsPage;
