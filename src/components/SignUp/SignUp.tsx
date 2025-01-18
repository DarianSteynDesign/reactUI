import './SignUp.scss';
import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function SignUp() {
  const signupMutation = useMutation({
    mutationFn: async (user: unknown) => {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      return response.json();
    },
    onSuccess: () => {
      console.log('User signed up successfully');
      window.location.href = '/login'; 
    },
    onError: (error) => {
      console.error('Error during signup:', error);
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className="signup-container">
      <Formik
        initialValues={{ name: '', surname: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await signupMutation.mutateAsync(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form className="signup-form">
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="surname">Surname:</label>
            <Field type="text" name="surname" id="surname" />
            <ErrorMessage name="surname" component="div" className="error" />
          </div>
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
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}
