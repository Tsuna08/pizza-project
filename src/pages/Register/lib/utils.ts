import * as yup from 'yup';

export type RegisterForms = {
  email: string;
  password: string;
  name: string;
};

export const defaultValuesSurvey = {
  email: '',
  password: '',
  name: ''
};

export const prepareFormValues = (data: RegisterForms) => ({
  email: data.email,
  password: data.password,
  name: data.name
});

export const schemaNewSurvey = yup.object().shape({
  email: yup.string().email('Не верный формат почты').required('Обязательное поле'),
  password: yup
    .string()
    .min(3, 'Пароль должен быть не меньше 3 символов')
    .required('Обязательное поле'),
  name: yup.string().required('Обязательное поле')
});
