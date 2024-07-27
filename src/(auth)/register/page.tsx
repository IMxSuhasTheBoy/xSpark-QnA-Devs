"use client";

import { useAuthStore } from "@/store/Auth";
import { FormEvent, useState } from "react";

export default function Register() {
  // strategy login the user as soon as registration is done
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.currentTarget);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    // validate
    if (!firstname || !lastname || !email || !password) {
      setError(() => "Please fill out all fields");
      return;
    }

    // call the store
    setIsLoading(() => true);
    setError;
    const registerResponse = await createAccount(
      `${firstname} ${lastname}`,
      email?.toString(),
      password?.toString()
    );

    if (registerResponse.error) {
      setError(() => registerResponse.error!.message);
    } else {
      const loginResponse = await login(
        email?.toString(),
        password?.toString()
      );

      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }

    setIsLoading(() => false);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
