import * as yup from 'yup';

import {EyeHideIcon, EyeShowIcon} from '~/assets';
import {Form, Field} from '~/components/forms/Form/types';

const fields: Field[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your name',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  name: yup
    .string()
    .required('Name is required')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .max(6, 'Password is too much - should be 10 chars maximum.'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
});

const registrationForm: Form = {
  fields,
  schema,
};

export default registrationForm;
