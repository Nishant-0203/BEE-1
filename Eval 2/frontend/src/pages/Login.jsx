import React, { useState } from "react";
import PasswordInput from "@/components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/helper";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API

    try {
      dispatch(signInStart());

      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data);
        dispatch(signInFailure(data.message));
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <h4 className="text-center text-3xl mb-7 font-bold">Login</h4>
        <form onSubmit={handleLogin}>
          <Label className="mb-2">Email</Label>
          <input
            type="text"
            placeholder="Email"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 mb-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label className="mb-2">Password</Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full py-3 rounded mt-2"
          >
            Login
          </Button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-[#2B85FF] underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
