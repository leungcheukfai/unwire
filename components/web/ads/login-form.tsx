"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ifLoggedIn, login } from "~/lib/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(username, password);

      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };
  const handleCheck = async () => {
    const result = await ifLoggedIn();
    console.log(result);
    if (result?.success) {
      router.push("/admin");
    }
  };
  useEffect(() => {
    handleCheck();
  }, [router]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className=" my-4 flex-col flex gap-6">
        <div>
          <input
            type="text"
            required
            className="relative block w-full px-3 mb-4 py-4 border border-gray-300  placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="relative block w-full px-3 mb-4 py-4 border border-gray-300  placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-4 text-base px-4 border border-transparent  font-medium rounded-md text-black bg-[#01DD85] hover:bg-[#01dd85] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
