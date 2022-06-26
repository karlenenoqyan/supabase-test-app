import {useContext} from 'react';

import {AuthContext} from '~/context';
import {IAuthContext} from '~/context/Auth/types';

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
