import {ICommonNavigationWithIcon} from '~/types';
import {ProjectsIcon, CreateProjectIcon} from '~/assets';

import Route from '../route';

const Navigation: ICommonNavigationWithIcon[] = [
  {
    name: 'Projects',
    route: Route.Home,
    Icon: ProjectsIcon,
  },
  {
    name: 'Create project',
    route: Route.Project,
    Icon: CreateProjectIcon,
  },
];

export default Navigation;
