import { useState, useEffect } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

// eslint-disable-next-line react-refresh/only-export-components
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<null | Session>(null);

  console.log(session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // if (!session) return <div>No session found</div>;
  // if (!session)
  //   return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;

  return children;
}

export default AuthGuard;
