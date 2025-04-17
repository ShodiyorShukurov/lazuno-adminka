import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { API_PATH, API_TOKEN, ROLE } from '../utils/constants';
import { notification } from 'antd';

// Validation schema for form
const validationSchema = Yup.object({
  text: Yup.string().required('Loginni kiriting'),
  password: Yup.string().required('Parolni kiriting'),
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
      notification.error({ message: 'Xatolik' });
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
        <h2 className="text-center mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Login
                </label>
                <Field
                  type="text"
                  id="text" // Change to text
                  name="text" // Change to text
                  className="form-control"
                  placeholder="Login"
                />
                <ErrorMessage
                  name="text" // Change to text
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
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
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
