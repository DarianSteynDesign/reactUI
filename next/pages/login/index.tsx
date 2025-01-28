import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useMessageFlow } from "../../app/hooks/useMessageFlow";

export default function Login() {
  // Define login mutation
  const loginMutation = useMutation({
    mutationFn: async (user) => {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("authToken", data.token);
      window.location.href = "/dashboard"; // Redirect to dashboard
    },
    onError: (error) => {
      console.error("Error during login:", error.message);
      if (error.message === "Login failed") {
        toastr.error("Sorry, your details seem to be incorrect");
      }
    },
  });

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const nice = {
    text: "Nice! You're all set to login. Go ahead and fill in your details.",
    delay: 5000,
  };

  useMessageFlow([{ text: nice.text, position: [5, 4] }]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await loginMutation.mutateAsync(values);
          }}
        >
          <Form className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-white">Login</h2>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
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
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
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
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-blue-700 py-2 px-4 rounded-full shadow hover:bg-blue-500 hover:text-white transition-colors"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
