"use client";

import { useState } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleActivate = () => {
    setIsActive(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Example validation
    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Perform login API call
      try {
        // await loginAction({ email, password });
        console.log("Login successful");
        router.push("/profile");
      } catch (err) {
        console.error("Login failed", err);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen">
      <div className="bg-gradient-rotated">
        <div className="navbar grid grid-cols-3 mt-5">
          <button
            className="back text-white flex items-center ms-2"
            onClick={() => router.back()}
          >
            <IoIosArrowBack className="text-2xl" aria-label="Go back" /> Back
          </button>
        </div>
        <div className="flex justify-center items-center h-screen">
          <div>
            <h1 className="ms-4 text-4xl font-medium text-white mb-8">Login</h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              onClick={handleActivate}
            >
              <input
                className={`${
                  isActive ? "bg-white/5 opacity-100" : "bg-white/10 opacity-50"
                } placeholder-white/60 border-none rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md w-80 text-white`}
                type="email"
                placeholder="Enter Username/Email"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
              <div className="relative">
                <input
                  className={`${
                    isActive
                      ? "bg-white/5 opacity-100"
                      : "bg-white/10 opacity-50"
                  } placeholder-white/60 border-none rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md w-80 text-white`}
                  type={`${isShowPassword ? "text" : "password"}`}
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Enter Password"
                />
                <span
                  className="text-2xl absolute top-3 right-3 cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  aria-label={
                    isShowPassword ? "Hide password" : "Show password"
                  }
                >
                  {isShowPassword ? (
                    <svg
                      stroke="currentColor"
                      stroke-width="0"
                      viewBox="0 0 576 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="icon-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" style={{ stopColor: "#f8fae5" }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#d5be88" }}
                          />
                        </linearGradient>
                      </defs>

                      <path
                        fill="url(#icon-gradient)"
                        d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 640 512"
                      className="icon"
                    >
                      <defs>
                        <linearGradient
                          id="icon-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" style={{ stopColor: "#f8fae5" }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#d5be88" }}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#icon-gradient)"
                        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <button
                className={`${
                  isActive ? "opacity-100" : "opacity-50"
                } mt-2 bg-gradient-to-r from-[#62cdcb] to-[#4599db] border-none rounded-lg p-3 w-80 font-medium text-white relative flex items-center justify-center`}
                disabled={isLoading}
                type="submit"
              >
                <div
                  className={`${
                    isActive ? "opacity-100" : "opacity-0"
                  } w-full h-full absolute top-2 left-0 bg-gradient-to-r from-[#62cdcb] to-[#4599db] blur-lg rounded-lg z-[-1]`}
                ></div>
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className="mt-20 flex justify-center">
              <span className="text-center text-white">
                No account?{" "}
                <Link
                  href={"/register"}
                  className="relative bg-golden text-transparent bg-clip-text"
                >
                  Register here
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#f8fae5] to-[#d5be88]"></span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
