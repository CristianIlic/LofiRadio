import React, { useEffect, useState } from "react";
import supabase from "../../api/supabase";
import { Navigate } from "react-router-dom";

function Wrapper({ children }) {
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    if (authenticated) {
      return <>{children}</>;
    } else {
      return <Navigate to="/signin" />;
    }
  }
}

export default Wrapper;
