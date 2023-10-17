"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/store/hook";
import { addUser } from "@/store/cartSlice";

const Login = ({ url }) => {
  const dispatch = useAppDispatch()
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get('error'));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "authenticated") {
    router?.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password, redirect: false });
  
  }
  dispatch(addUser(
    { name: session.data?.user?.name, user_id: session.data?.user?.id }
  ))

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see yure page</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {error && error}
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/register">
        Create new account
      </Link>
      <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button>
    </div>
  );
};

export default Login;
