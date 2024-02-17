'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Set isLoading to true to indicate loading state
    setError(""); // Clear any previous errors
    try {
      await signIn("email", { email, password });
      // handleLogin(); // Call the handleLogin function when the form is submitted
    } catch (error) {
      setError("Invalid email or password"); // Set the error message
    }
    setIsLoading(false); // Set isLoading to false after form submission
  };

  return (
    <div className="flex min-h-screen flex-1">
      {/* login left banner */}
      <div className=" h-screen w-full hidden lg:block md:w-1/2 xl:w-2/3">
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
        <div className="w-full h-100">
          <h1 className="text-xl  font-bold">Travellian Login</h1>
          <h1 className="text-xl  font-bold leading-tight mt-12 md:text-2xl">
            Login to your account{" "}
          </h1>

          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500">{error}</div>}
            <div className="mt-10">
              <label className="block text-gray-700">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter Email Address"
                className="w-full border-slate-950  rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="mt-4">
              <label>Password</label>
              <input
                value={password} // Connect the input to the state
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                className="w-full border-slate-950 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none text-white font-semibold rounded-lg px-4 py-3 mt-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>

            <hr className="my-6 border-gray-300 w-full" />
            <p className="mt-8 ">
              Need an account?
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}