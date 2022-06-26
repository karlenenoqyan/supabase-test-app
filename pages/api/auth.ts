import {NextApiRequest, NextApiResponse} from 'next';

import supabase from '~/lib/supabase';

const authHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default authHandler;
