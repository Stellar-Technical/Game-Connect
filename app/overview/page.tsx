'use client'
import { useSession } from "next-auth/react";

export default function OverviewPage() {
  const { data: session , status } = useSession();

  console.log( session);
  console.log(status);
  
  
  return (
    status === 'authenticated' && session.user && (
    <div>
      <h1>Overview Page</h1>
      {session ? (
        <p>Welcome, {session.user?.name}!</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
    )
  );
}
