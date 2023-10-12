"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Profilepage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data} </Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 rounded px-4 py-2 text-white"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 rounded px-4 py-2 text-white"
      >
        Get User Details
      </button>
    </div>
  );
}
