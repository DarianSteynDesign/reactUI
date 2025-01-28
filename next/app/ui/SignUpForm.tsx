"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../lib/userActions";
import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const initialValues: SignUpFormValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await createUser(values);
      window.location.href = "/login";
    } catch (error: any) {
      setServerError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg">
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
            <label htmlFor="name" className="block font-medium mb-1 text-white">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border-b-2 bg-transparent focus:outline-none"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Surname */}
          <div>
            <label htmlFor="surname" className="block font-medium mb-1 text-white">
              Surname
            </label>
            <Field
              type="text"
              name="surname"
              id="surname"
              className="w-full p-2 border-b-2 bg-transparent focus:outline-none"
            />
            <ErrorMessage
              name="surname"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-white">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border-b-2 bg-transparent focus:outline-none"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1 text-white">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="w-full p-2 border-b-2 bg-transparent focus:outline-none"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 m-auto w-fit">
            <button
              type="submit"
              className="bg-white text-blue-700 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
            >
              Sign Up
            </button>

            <Link
              href="/login"
              className="bg-white text-blue-700 py-2 px-4 rounded-full shadow hover:bg-blue-500 hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
