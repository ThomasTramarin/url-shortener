import LoginForm from "./SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center w-full max-w-md">
        <h1>Create your account</h1>
        <p className="text-text-secondary">
          Join now to start shortening your URLs quickly and easily.
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default SignupPage;
