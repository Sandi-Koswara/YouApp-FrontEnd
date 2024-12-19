"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login after the component is mounted
    router.push("/login");
  }, [router]);

  return <main className="primaryBg">Redirecting...</main>;
}
