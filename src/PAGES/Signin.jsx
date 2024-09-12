import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../assets/utils/Firebase";
import { useNavigate } from "react-router";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/");
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSiginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    // signing in with Google
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result==>>", result);

        // This gives you a Google Access Token.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log("user==>>>", user);
        navigate("/");

      })
      .catch((error) => {
        console.log("error==>>", error);

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode==>>", errorCode, "errorMessage==>>", errorMessage);

        // The email of the user's account used.
        const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="my-5">
      <form className="flex flex-col items-center py-3">
        <Input
          isClearable
          isRequired
          value={email}
          size="lg"
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          onClear={() => console.log("input cleared")}
          className="max-w-xs my-3 mx-3"
        />

        <Input
          isClearable
          isRequired
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          label="Password"
          variant="bordered"
          placeholder="Enter your Password"
          onClear={() => console.log("input cleared")}
          className="max-w-xs my-5"
        />

        <Button isLoading={loading} onClick={handleSignin} color="secondary">
          Sign In
        </Button>

        <h1 className="text-center my-8">Or</h1>

        <Button  onClick={handleSiginWithGoogle} color="secondary">
          Sign In With Google
        </Button>
      </form>
    </div>
  );
}
