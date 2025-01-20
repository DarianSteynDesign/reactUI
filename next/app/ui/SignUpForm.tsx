'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../lib/userActions';
import { useState } from 'react';

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const initialValues: SignUpFormValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await createUser(values);
      window.location.href = '/login';
    } catch (error: any) {
      setServerError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      
      {serverError && (
        <div className="text-red-600 bg-red-100 p-3 mb-4 rounded">
          {serverError}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Surname */}
          <div>
            <label htmlFor="surname" className="block font-medium mb-1">
              Surname
            </label>
            <Field
              type="text"
              name="surname"
              id="surname"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="surname"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
}
