'use client'; // เนื่องจากเราจะทำงานกับการกระทำบนฝั่ง client
import { signIn } from 'next-auth/react';
import React from 'react';

export default function Login() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login with Discord</h1>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#5865F2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => signIn('discord')}
      >
        Login with Discord
      </button>
    </div>
  );
}
