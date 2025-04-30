// import React from 'react';
// import { Link } from 'react-router-dom';
// // import { DollarSign } from 'lucide-react';
// import  LoginForm  from '../components/auth/LoginForm';

// const LoginPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         {/* <div className="flex justify-center">
//           <DollarSign className="h-12 w-12 text-emerald-600 dark:text-emerald-500" />
//         </div> */}
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
//           Or{' '}
//           <Link
//             to="/register"
//             className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
//           >
//             create a new account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <LoginForm />

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3">
//               {/* Google Button */}
//               <button
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <span className="sr-only">Sign in with Google</span>
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path
//                     d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
//                   />
//                 </svg>
//               </button>

//               {/* GitHub Button */}
//               <button
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <span className="sr-only">Sign in with GitHub</span>
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path
//                     fillRule="evenodd"
//                     d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
//                     0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
//                     -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 
//                     2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 
//                     0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 
//                     0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 
//                     2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 
//                     1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 
//                     1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 
//                     10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;














import { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, rememberMe });
    // Handle login logic here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      {/* Container for the entire login page with responsive padding */}
      <div className="m-auto w-full max-w-md px-4 py-8 sm:px-6 sm:py-12">
        
        {/* Login Card */}
        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-white/30 p-3">
                <User size={32} className="text-white" />
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-blue-100">Sign in to your account</p>
          </div>
          
          {/* Form Section */}
          <div className="px-6 py-8">
            <div>
              
              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 pr-10 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-500 hover:text-gray-700" />
                    ) : (
                      <Eye size={18} className="text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              
              {/* Login Button */}
              <button
                onClick={handleSubmit}
                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <LoginPage size={18} className="mr-2" />
                Sign In
              </button>
              
              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="font-medium text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
          
          {/* Social Login Section */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="mb-4 text-center text-sm font-medium text-gray-500">Or sign in with</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="mr-2 h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                </svg>
                Facebook
              </button>
              <button className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="mr-2 h-5 w-5" fill="#000000" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.163 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.54 9.54 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





