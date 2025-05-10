import { useState, useEffect } from 'react';
import React from 'react'; // ✅ Required for JSX in some setups

import './App.css'
import { supabase } from '../supabaseClient';
  import { Auth } from '@supabase/auth-ui-react'
  import { ThemeSupa } from '@supabase/auth-ui-shared'


function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      return () => subscription.unsubscribe()
    }, [])

console.log(session?.user?.email);

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log('Error signing out:', error.message)
  else setSession(null)
}



if (!session) {
  return (
    // <Auth
    //   supabaseClient={supabase}
    //   appearance={{ theme: ThemeSupa }}
    // />
    <>
   <button onClick={() => supabase.auth.signInWithOAuth({ provider  
: 'google' })}>
      Sign in with Google
    </button>

    </>
  );
}

    else {
      return (
      <div>
        <h2>Welcome , {session?.user?.email}</h2>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
    }
  }



export default App
