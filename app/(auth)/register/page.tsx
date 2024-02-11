"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({
            email,
            name,
            password,
            passwordRepeat,
            role,
            phone,
            picture,
          }),
        }
      );

      if (response.ok) {
        // Assuming the API response contains a 'role' field
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Display the error message
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the API request completes
    }
  };
  const handleSubmit = (e: any) => {
    if (password !== passwordRepeat) {
    }
    e.preventDefault(); // Prevent the default form submission
    setError("");
    handleRegister(); // Call the handleLogin function when the form is submitted
  };
  return (
    <section className="flex min-h-screen flex-1 ">
      {/* login left banner */}
      <div className=" relative hidden w-0 flex-1 lg:block">
        <Image
          src="/login-register.jpg"
          width={400}
          height={400}
          className="w-full h-full object-cover"
          alt="img"
        />
      </div>

      {/* login right banner */}
      <div
        className="bg-white items-center justify-center flex md:mx-auto  lg:max-w-full  md:max-w-md
       w-full md:w-1/2 xl:w-1/3 px-7 py-10 lg:px-6 xl:px-12 "
      >
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h1 className="text-xl  font-bold leading-tight mt-12 md:text-2xl">
            Registration{" "}
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Or already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div className="mt-10">
              <label className="block text-gray-700">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email Address"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="mt-4">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Enter Phone"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label>Confirmation Password </label>
              <input
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                type="password"
                placeholder="Enter Confirmation Password"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="roles"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a Role
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="mt-4">
              <label>Image</label>
              <input
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                type="text"
                placeholder="Enter Image URL"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <button
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none text-white font-semibold rounded-lg px-4 py-3 mt-6"
              type="submit"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>

            <div className="relative mt-4">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full block bg-white border-gray-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-gray-700 font-semibold rounded-lg px-4 py-3 border mt-4"
            >
              <Image
                src="/google.png"
                width={18}
                height={18}
                alt="Google Logo"
                className="inline mr-2"
              />
              <span className="ml-4">Sign Up with Google</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
