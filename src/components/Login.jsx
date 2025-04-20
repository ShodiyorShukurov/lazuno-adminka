import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { API_PATH, API_TOKEN, ROLE } from '../utils/constants';
import { notification } from 'antd';

// Validation schema for form
const validationSchema = Yup.object({
  text: Yup.string().required('Введите логин'),
  password: Yup.string().required('Введите пароль'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    text: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      fetch(API_PATH + '/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username: values.text,
          password: values.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem(API_TOKEN, data.token);
            localStorage.setItem(ROLE, data.user.role);
            if (localStorage.getItem(ROLE) === 'superadmin') {
              navigate('/admin');
            } else {
              navigate('/category');
            }
          }
        });
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Ошибка' });
    }

    setSubmitting(false);
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="card shadow p-4"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 className="text-center mb-4">Вход</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Логин
                </label>
                <Field
                  type="text"
                  id="text"
                  name="text"
                  className="form-control"
                  placeholder="Логин"
                />
                <ErrorMessage
                  name="text"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Пароль"
                  autoComplete="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Вход...' : 'Войти'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;