import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center w-full max-w-md">
        <h1>Welcome back!</h1>
        <p className="text-text-secondary">
          Log in and continue shortening your URLs
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
