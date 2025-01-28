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
    text: "I'll be here if you need anything.",
    delay: 5000,
  };

  useMessageFlow([
    { text: signUpText.text, position: [5, 4], delayTime: 5000 },
    { text: illBeHere.text, position: [4, 4], delayTime: 3000, clearAfterDelay: true },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Create an account on our platform" />
      </Head>
      <div className="signup-page">
        <h1 className="text-3xl text-left font-semibold text-white mt-10 ml-10">
          Sign Up
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
