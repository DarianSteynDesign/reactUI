import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function Login() {
    // Define login mutation
    const loginMutation = useMutation({
        mutationFn: async (user) => {
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
            window.location.href = '/dashboard'; // Redirect to dashboard
        },
        onError: (error) => {
            console.error('Error during login:', error.message);
            if (error.message === 'Login failed') {
                toastr.error('Sorry, your details seem to be incorrect');
            }
        },
    });

    // Form validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    return (
<div className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await loginMutation.mutateAsync(values);
      }}
    >
      <Form className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Field
            type="email"
            name="email"
            id="email"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Field
            type="password"
            name="password"
            id="password"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </Form>
    </Formik>
  </div>
</div>

    );
}
