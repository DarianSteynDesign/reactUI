import Head from 'next/head';
import SignUpForm from '../../app/ui/SignUpForm';

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Create an account on our platform" />
      </Head>
      <div className="signup-page">
        <h1>Create an Account</h1>
        <SignUpForm />
      </div>
    </>
  );
}
