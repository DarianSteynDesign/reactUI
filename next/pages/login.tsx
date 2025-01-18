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
