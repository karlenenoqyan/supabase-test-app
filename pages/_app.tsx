import {AppProps} from 'next/app';
import {ToastContainer} from 'react-toastify';
import {SupabaseContextProvider} from 'use-supabase';

import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.css';

import '~/styles/index.scss';

import supabase from '~/lib/supabase';
import {AuthContextProvider} from '~/context';

const TestApp: React.FC<AppProps> = ({Component, pageProps}) => (
  <SupabaseContextProvider client={supabase}>
    <AuthContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthContextProvider>
  </SupabaseContextProvider>
);

export default TestApp;
