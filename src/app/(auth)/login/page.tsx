"use client";

import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/Auth";

export default function Login() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // validate
    if (!email || !password) {
      setError(() => "Please fill out all fields");
      return;
    }

    // call the store
    setIsLoading(() => true);
    setError("");
    const loginResponse = await login(email.toString(), password.toString());

    if (loginResponse.error) {
      setError(() => loginResponse.error!.message);
    }

    setIsLoading(() => false);
  };
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
