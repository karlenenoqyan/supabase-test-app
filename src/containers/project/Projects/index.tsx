import React, {useMemo} from 'react';
import {Facebook} from 'react-content-loader';
import {useSupabase, useQuery} from 'use-supabase';
import {PostgrestBuilder} from '@supabase/postgrest-js';

import {useAuth} from '~/hooks';
import {ProjectData} from '~/types';
import {Card, Typography} from '~/components';

import styles from './Projects.module.scss';

const Project: React.FC = () => {
  const {user} = useAuth();
  const query = useSupabase()
    .from('projects')
    .select('*')
    .eq('user_id', user?.id) as PostgrestBuilder<ProjectData[]>;
  const {data, error} = useQuery(query);
  const isLoading = !error && !data;
  const isDataExists = !isLoading && data?.length;

  const renderProjects = useMemo(
    () =>
      data?.map(({id, title, image}) => (
        <Card key={id} id={id} text={title} src={image} />
      )),
    [data],
  );

  return isDataExists ? (
    <div className={styles.container}>
      {isLoading ? <Facebook /> : renderProjects}
    </div>
  ) : (
    <Typography>You do not have any project</Typography>
  );
};

export default Project;
