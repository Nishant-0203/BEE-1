import React, { useState } from "react";
import PasswordInput from "@/components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/helper";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // sign up api
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { username: name, email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);

      setError("");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <h4 className="text-center text-3xl mb-7 font-bold">Sign up</h4>
          <form onSubmit={handleSignUp}>
            <Label className="mb-2">Name</Label>
            <input
              type="text"
              placeholder="Name"
              className="border w-full p-2 rounded focus:outline-none focus:ring-2 mb-5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
            <Button type="submit" className="w-full py-3 rounded mt-2">
              Sign up
            </Button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-[#2B85FF] underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
