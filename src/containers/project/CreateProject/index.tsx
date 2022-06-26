import React, {useCallback} from 'react';
import {toast} from 'react-toastify';

import {useAuth} from '~/hooks';
import {Form} from '~/components';
import {uploadImage} from '~/utils';
import supabase from '~/lib/supabase';
import {RouterService} from '~/services';
import {projectForm, Route} from '~/constants';

import styles from './CreatProject.module.scss';

const CreateProject: React.FC = () => {
  const {user} = useAuth();

  const handleProjectFormSubmit = useCallback(
    async ({title, image}) => {
      const projectImageUrl = await uploadImage(image);

      const {data, error} = await supabase
        .from('projects')
        .insert([{title, image: projectImageUrl, user_id: user?.id}]);

      if (data) {
        RouterService.push(Route.Home);
      }

      if (error) {
        toast.error(error.message);
      }
    },
    [user?.id],
  );

  return (
    <Form
      form={projectForm}
      submitText="Create"
      className={styles.container}
      onSubmit={handleProjectFormSubmit}
    />
  );
};

export default CreateProject;
