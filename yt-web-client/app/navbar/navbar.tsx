'use client';
import SignIn from "./sign-in";
import Link from "next/link";
import Image from "next/image"
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { User } from "firebase/auth";
import Upload from "./upload";


function NavBar() {
  // Initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [] /* No dependencies, never rerun */);


  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.logoContainer}>
            <Image width = {90} height = {20} src = "/youtube-logo.svg" alt = "YouTube Logo"/>
        </span>
      </Link>
      {
        user && <Upload/>
      }
      <SignIn user={user} />
    </nav>
  );
}

export default NavBar;