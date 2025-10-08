import React from "react";
import SignInButton from "../Buttons/SignInButton";
import SignOutButton from "../Buttons/SignOutButton";
import ProfileButton from "../Buttons/ProfileButton";
import HomeButton from "../Buttons/HomeButton";
import InfoIcon from "@mui/icons-material/Info";
import { useAuthStore } from "../../utils/store";
import InfoBox from "../InfoBox";

function Navbar() {
  const { user } = useAuthStore();

  return (
    <div className="user-buttons">
      {/* <HomeButton /> */}
      {user ? <>{/* <ProfileButton /> */}</> : <SignInButton />}
      <InfoBox />
    </div>
  );
}

export default Navbar;
