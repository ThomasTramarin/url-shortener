import { useState, type FormEvent } from "react";
import SubmitButton from "../../components/SubmitButton";
import FormInput from "../../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const LoginForm = () => {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    success: false,
    text: "",
  });

  const [errors, setErrors] = useState({
    email: [""],
    password: [""],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors({ email: [""], password: [""] });
    setMessage({ success: false, text: "" });

    const error = await login(formInput);

    if (!error) {
      setMessage({ success: true, text: "Login successful! Redirecting..." });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      setErrors({
        email: error.fields?.email || [""],
        password: error.fields?.password || [""],
      });
      setMessage({ success: false, text: error.message || "Login failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <FormInput
        id="email"
        type="email"
        label="Email"
        error={errors.email[0]}
        placeholder="email@example.com"
        value={formInput.email}
        onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
      />

      <FormInput
        id="password"
        type="password"
        label="Password"
        error={errors.password[0]}
        placeholder="************"
        value={formInput.password}
        onChange={(e) =>
          setFormInput({ ...formInput, password: e.target.value })
        }
      />

      <div>
        <SubmitButton text="Log in" loading={false} />
        <div className="flex justify-between mt-1">
          {message && (
            <span
              className={`${
                message.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {message.text}
            </span>
          )}
          <p>
            Don't have an account?{" "}
            <Link className="text-link underline" to={"/signup"}>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
