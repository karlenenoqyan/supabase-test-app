import {NextPage} from 'next';

import {Seo} from '~/components';
import {Project} from '~/containers';
import {enforceAuthenticated} from '~/utils';

const ProjectPage: NextPage = () => (
  <Seo title="Project" metaDescription="Project page description">
    <Project />
  </Seo>
);

export const getServerSideProps = enforceAuthenticated();

export default ProjectPage;
