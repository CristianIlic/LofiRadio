import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../api/supabase";
import { useAuthStore } from "../../utils/store";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const { setUser, setUserData } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert("No se pudo registrar usuario.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setMessage("No se pudo iniciar sesión con el nuevo usuario.");
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div id="signup-form">
      <h3>Registro</h3>
      {message && <span>{message}</span>}
      <p>
        Ya tienes una cuenta? <Link to={"/signin"}>Inicia sesión</Link>
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
        <button onClick={handleSignUp} disabled={loading}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Signup;
