import { useState, type FormEvent } from "react";
import SubmitButton from "../../components/SubmitButton";
import FormInput from "../../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const SignupForm = () => {
  const { signup, loading } = useAuthStore();
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

    // Reset
    setMessage({ success: false, text: "" });
    setErrors({ email: [""], password: [""] });

    const error = await signup(formInput);

    if (!error) {
      setMessage({ success: true, text: "Signup successful! Redirecting..." });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMessage({ success: false, text: error.message || "Signup failed" });
      setErrors({
        email: error.fields?.email || [""],
        password: error.fields?.password || [""],
      });
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
        <SubmitButton text="Signup" loading={false} />
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
            Already have an account?{" "}
            <Link className="text-link underline" to={"/login"}>
              login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
