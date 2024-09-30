import React, { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/Auth/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { AuthContext } from "../store/auth-context";
function RegisterScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { token, userEmail } = await createUser(email, password);
      authCtx.authenticate(token, userEmail);
    } catch (error) {
      console.error(error);
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default RegisterScreen;
