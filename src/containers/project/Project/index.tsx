import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Instagram} from 'react-content-loader';
import {useSupabase, useQuery} from 'use-supabase';
import {PostgrestBuilder} from '@supabase/postgrest-js';

import {Card} from '~/components';
import {Route} from '~/constants';
import {ProjectData} from '~/types';

const Project: React.FC = () => {
  const {query: params, replace} = useRouter();
  const query = useSupabase()
    .from('projects')
    .select('*')
    .eq('id', params?.projectId)
    .single() as PostgrestBuilder<ProjectData>;
  const {data, error} = useQuery(query);

  useEffect(() => {
    if (data?.message) {
      replace(Route.Home);
    }
  }, [data?.message, replace]);

  if (!data && !error) {
    return <Instagram height={200} />;
  }

  if (data && !data.message) {
    return <Card id={data.id} text={data.title} src={data.image} />;
  }

  return null;
};

export default Project;
