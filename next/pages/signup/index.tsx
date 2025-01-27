import Head from "next/head";
import SignUpForm from "../../app/ui/SignUpForm";
import { useMessageFlow } from "../../app/hooks/useMessageFlow";

export default function SignUpPage() {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const signUpText = {
    text: "Go ahead and fill in some of your info, I promise to keep it safe.",
    delay: 5000,
  };
  const illBeHere = {
    text: "I'll be up here if you need anything.",
    delay: 5000,
  };

  useMessageFlow([
    { text: signUpText.text, position: [5, 4], delayTime: 5000 },
    { text: illBeHere.text, position: [1, 1], delayTime: 3000, clearAfterDelay: true },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-700">
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Create an account on our platform" />
      </Head>
      <div className="signup-page">
        <h1 className="text-lg font-semibold text-gray-800 text-center mt-10">
          Create an Account
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
