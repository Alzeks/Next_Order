"use client"

import { SessionProvider } from "next-auth/react";
import React from "react";

 //const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
