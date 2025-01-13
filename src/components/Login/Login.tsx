import './Login.scss';
import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export function Login() {
  //Covered: Post API call / user authentication
  const loginMutation = useMutation({
    mutationFn: async (user: any) => {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Login failed'); 
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      localStorage.setItem('authToken', data.token);
      window.location.href = '/dashboard'; 
    },
    onError: (error) => {
      console.log('Error', error.message);
      if(error.message == 'Login failed') {
        toastr.error('Sorry, your details seem to be incorrect');
      }
      console.error('Error during login:', error);
    }
  });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });
  //Covered: Form vaidation
  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await loginMutation.mutateAsync(values);
        }}
      >
        <Form className="login-form">
          <h2>Login</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
