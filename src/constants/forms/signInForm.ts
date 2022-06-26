import * as yup from 'yup';

import {EyeShowIcon, EyeHideIcon} from '~/assets';
import {Form, Field} from '~/components/forms/Form/types';

const fields: Field[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
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
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password is too short - should be 8 chars minimum.'),
});

const signInForm: Form = {
  fields,
  schema,
};

export default signInForm;
