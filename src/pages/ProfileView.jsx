import React, { useEffect, useState } from "react";
import supabase from "../api/supabase";
import { useAuthStore } from "../utils/store";

function ProfileView() {
  const { user, userData } = useAuthStore();
  const [firstname, setFirstname] = useState(userData?.firstname || "");
  const [lastname, setLastname] = useState(userData?.lastname || "");
  const [nickname, setNickname] = useState(userData?.nickname || "");
  const [message, setMessage] = useState("");

  console.log(userData);

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          nickname: nickname.trim(),
        })
        .eq("id", user.id)
        .select();

      if (error) {
        console.error("Error en actualización:", error);
        setMessage(`Error: ${error.message}`);
        return;
      }

      if (data && data.length > 0) {
        setMessage("Usuario actualizado exitosamente.");
      } else {
        setMessage("No se encontró el usuario para actualizar.");
      }
    } catch (err) {
      console.error("Error general:", err);
    }
  };

  return (
    <div className="container form-fields">
      Editar Perfil
      {message && <span>{message}</span>}
      <input
        onChange={(e) => setFirstname(e.target.value)}
        type="text"
        name="firstname"
        placeholder="Nombre"
        defaultValue={userData.firstname}
      />
      <input
        onChange={(e) => setLastname(e.target.value)}
        type="text"
        name="lastname"
        placeholder="Apellido"
        defaultValue={userData.lastname}
      />
      <input
        onChange={(e) => setNickname(e.target.value)}
        type="text"
        name="nickname"
        placeholder="Apodo"
        defaultValue={userData.nickname}
      />
      <button onClick={handleSubmit}>Actualizar</button>
    </div>
  );
}

export default ProfileView;
