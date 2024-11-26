"use client";

import { useState } from "react";
import React from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebaseConfig";

interface LoginModalProps {
  onClose: () => void;
}

const getErrorMessage = (error: string): string => {
  if (error.includes("auth/wrong-password")) return "Incorrect password. Please try again.";
  if (error.includes("auth/user-not-found")) return "No user found with this email.";
  if (error.includes("auth/email-already-in-use")) return "This email is already in use.";
  if (error.includes("auth/weak-password")) return "Password should be at least 6 characters.";
  if (error.includes("auth/invalid-email")) return "Please enter a valid email address.";
  return "An unknown error occurred. Please try again.";
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlert({ message: "Login successful!", type: "success" });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      const error = err as FirebaseError;
      setAlert({ message: getErrorMessage(error.message), type: "error" });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlert({ message: "Registration successful!", type: "success" });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      const error = err as FirebaseError;
      setAlert({ message: getErrorMessage(error.message), type: "error" });
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setAlert({ message: "Password reset email sent!", type: "success" });
    } catch (err) {
      const error = err as FirebaseError;
      setAlert({ message: getErrorMessage(error.message), type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md relative">
        <button
          className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {alert && (
          <div
            className={`p-4 mb-4 rounded ${
              alert.type === "success"
                ? "bg-green-100 text-green-700 border border-green-500"
                : "bg-red-100 text-red-700 border border-red-500"
            }`}
          >
            {alert.message}
          </div>
        )}

        {!isRegistering ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-sky-500 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-sky-400 text-white rounded hover:bg-sky-600"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                className="text-sky-500 hover:underline"
                onClick={() => setIsRegistering(true)}
              >
                Register
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-sky-400 text-white rounded hover:bg-sky-600"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                className="text-sky-500 hover:underline"
                onClick={() => setIsRegistering(false)}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;