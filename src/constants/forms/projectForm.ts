import * as yup from 'yup';

import {Form, Field} from '~/components/forms/Form/types';

const fields: Field[] = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Your project title here',
  },
  {
    name: 'image',
    type: 'file',
    label: 'Image',
  },
];

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  image: yup
    .mixed()
    .required('Image is required')
    .test(
      'fileFormat',
      'Unsupported image format',
      (value) =>
        value[0] &&
        ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
          value[0].type,
        ),
    ),
});

const projectForm: Form = {
  fields,
  schema,
};

export default projectForm;
