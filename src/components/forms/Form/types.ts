import * as yup from 'yup';
import {SubmitHandler, FieldValues} from 'react-hook-form';

import {Route} from '~/constants';

import {IInputProps} from '../../shared/Input/types';

export type LabelOptions = {
  firstLink: Route;
  secondLink: Route;
  firstLinkText: string;
  secondLinkText: string;
};

export type Field = IInputProps & {
  labelOptions?: LabelOptions;
};

export type Form = {
  fields: Field[];
  schema: yup.AnyObjectSchema;
};

export interface IFormProps<TFieldValues extends FieldValues = FieldValues> {
  form: Form;
  submitText: string;
  className?: string;
  onSubmit: SubmitHandler<TFieldValues>;
}

export interface IFormRef {
  onSubmitFailed: () => void;
}
