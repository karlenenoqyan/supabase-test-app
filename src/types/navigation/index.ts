import React from 'react';

import {Route} from '~/constants';

export interface ICommonNavigationItem {
  name: string;
  route: Route;
}

export interface ICommonNavigationWithIcon extends ICommonNavigationItem {
  Icon: React.ComponentType;
}
