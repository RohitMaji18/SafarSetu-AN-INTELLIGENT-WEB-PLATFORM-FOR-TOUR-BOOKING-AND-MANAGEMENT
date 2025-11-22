import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import AuthContext from "../context/AuthContext";
import { toast } from "sonner"; // <-- IMPORT TOAST

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // This state is for on-page errors
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });

      // Call the context function to update global state
      login(response.data.user, response.data.token);

      // Show success toast
      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      // LEAVE THIS EMPTY
      // api.js is already showing the error toast.
      // We still set local error state just in case
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to Your Account</CardTitle>
          <CardDescription>Welcome back to Travlystiq!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* This local error message is optional */}
              {error && (
                <p className="text-sm text-center text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
