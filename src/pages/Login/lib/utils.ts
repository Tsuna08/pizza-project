import * as yup from 'yup';

export type LoginForms = {
  email: string;
  password: string;
};

export const defaultValuesSurvey = {
  email: '',
  password: ''
};

export const prepareFormValues = (data: LoginForms) => ({
  email: data.email,
  password: data.password
});

export const schemaNewSurvey = yup.object().shape({
  email: yup.string().email('Не верный формат почты').required('Обязательное поле'),
  password: yup.string().min(3, 'Пароль должен быть не меньше 3 символов').required()
});
