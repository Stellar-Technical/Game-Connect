'use client'
import { useSession } from "next-auth/react";
import { Alert } from "flowbite-react";
import { Button } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
export default function OverviewPage() {
  const { data: session , status } = useSession();

  
  return (
    status === 'authenticated' && session.user && (
    <div>
      <h1>Overview Page</h1>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <Alert color="failure" icon={HiInformationCircle}>Alert!</Alert>
        </>
        
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
    )
  );
}
