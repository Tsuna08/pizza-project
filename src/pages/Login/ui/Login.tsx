import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Header, Input } from '@/components';
import { routers } from '@/routers';
import { AppDispatch, RootState } from '@/store/store';
import { login, userActions } from '@/store/user.slice';

import { defaultValuesSurvey, LoginForms, prepareFormValues, schemaNewSurvey } from '../lib/utils';
import classes from './Login.module.scss';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { jwt, loginErrorMessage } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) navigate(routers.root);
  }, [jwt, navigate]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForms>({
    defaultValues: defaultValuesSurvey,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaNewSurvey)
  });

  const onSubmit: SubmitHandler<LoginForms> = async (date) => {
    dispatch(userActions.clearLoginMessage());
    dispatch(login(prepareFormValues(date)));
  };

  const [emailField, passwordField] = watch(['email', 'password']);

  useEffect(() => {
    if (emailField || passwordField) {
      dispatch(userActions.clearLoginMessage());
    }
  }, [emailField, passwordField, dispatch]);

  return (
    <>
      <Header>Вход</Header>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={classes.field}>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            placeholder='Введите email'
            error={errors.email}
            {...register('email')}
          />
          {errors.email?.message && (
            <span className={classes.errorMessage}>{errors.email?.message}</span>
          )}
        </section>

        <section className={classes.field}>
          <label htmlFor='password'>Пароль</label>
          <Input
            id='password'
            type='password'
            placeholder='Введите пароль'
            error={errors.password}
            {...register('password')}
          />
          {errors.password?.message && (
            <span className={classes.errorMessage}>{errors.password?.message}</span>
          )}
        </section>

        {loginErrorMessage && <span className={classes.errorMessage}>{loginErrorMessage}</span>}
        <Button type='submit' size='large'>
          Вход
        </Button>

        <section className={classes.register}>
          <span>Нет аккаунта?</span>
          <Link to={`${routers.auth}/${routers.register}`} className={classes.link}>
            Зарегистрироваться
          </Link>
        </section>
      </form>
    </>
  );
};

export default Login;
