import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../api/supabase";
import { useAuthStore } from "../../utils/store";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const { setUser } = useAuthStore();

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("No se pudo iniciar sesión.");
    } else {
      setUser(data);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div id="signup-form">
      <h3>Iniciar sesión</h3>
      <p>
        No tienes una cuenta? <Link to={"/signup"}>Regístrate</Link>
      </p>
      <div className="form-fields">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Correo electrónico"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
        />
        <button onClick={handleSignIn} disabled={loading}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Signin;
