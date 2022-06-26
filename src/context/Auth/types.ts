import {Session} from '@supabase/supabase-js';

export interface IAuthContext {
  session: Session | null;
  user: Session['user'] | null;
}
