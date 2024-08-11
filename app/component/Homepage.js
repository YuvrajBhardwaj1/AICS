"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from "react-icons/fa";
import "@fontsource/inter";
import "@fontsource/rubik"; 

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter(); 

  const handleSignOut = async () => {
    await signOut({ redirect: false }); 
    router.push("/"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-400 to-blue-500 font-inter">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Headstarter AI Chatbot</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {session ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {session.user.email}</h2>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-400 transform transition-transform duration-300 hover:scale-105"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
              <button
                onClick={() => signIn("github")}
                className="flex items-center justify-center w-full bg-gray-800 text-white px-4 py-2 rounded mb-4 shadow-lg hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105"
              >
                <FaGithub className="mr-2 text-xl" /> Sign in with GitHub
              </button>
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center w-full bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-500 transform transition-transform duration-300 hover:scale-105"
              >
                <FaGoogle className="mr-2 text-xl" /> Sign in with Google
              </button>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center shadow-md">
        <p>&copy; {new Date().getFullYear()} Headstarter AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
