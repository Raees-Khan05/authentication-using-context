import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Firebase functions import kiye
import { auth } from "../assets/utils/Firebase"; // Firebase auth ko import kiya
import { useNavigate } from "react-router";

export default function Signup() {

  const [email, setEmail] = useState(''); // Email ke liye state
  const [password, setPassword] = useState(''); // Password ke liye state
  const [username, setUsername] = useState(''); // Username ke liye state
  const [loading, setLoading] = useState(false); // Loading state to show a spinner during signup process

  const navigate = useNavigate()

  // Signup function jo Firebase ke through user create karegi
  const handleSignup = async () => {
    try {
      setLoading(true); // Loading ko true set kiya taake signup ke waqt button disabled ho
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Firebase function jo email aur password se user create karta hai
      
      // Username ko user profile me update kiya
      await updateProfile(userCredential.user, { displayName: username });
      console.log("User created: ", userCredential.user); // Console me user info print ki
      setLoading(false); // Loading ko false set kiya jab signup complete ho gaya
      navigate('/')
    } catch (error) {
      console.error("Signup error: ", error); // Agar error aaye to console me error print karega
      setLoading(false); // Error ke baad loading ko false set kiya
    }
  };

  return (
    <div className="my-5">

      <form className="flex flex-col items-center py-3">
        <Input
          // Username ka input field
          isClearable
          isRequired
          value={username} // Username ka value jo state me save hoga
          size="lg"
          type="text"
          label="Username"
          variant="bordered"
          placeholder="Enter Your Name"
          onChange={(e) => setUsername(e.target.value)} // Username ko update kar raha hai
          onClear={() => console.log("input cleared")}
          className="max-w-xs my-3 mx-3"
        />

        <Input
          // Email ka input field
          isClearable
          isRequired
          value={email} // Email ka value jo state me save hoga
          size="lg"
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)} // Email ko update kar raha hai
          onClear={() => console.log("input cleared")}
          className="max-w-xs my-3 mx-3"
        />

        <Input
          // Password ka input field
          isClearable
          isRequired
          onChange={(e) => setPassword(e.target.value)} // Password ko update kar raha hai
          value={password} // Password ka value jo state me save hoga
          type="password"
          label="Password"
          variant="bordered"
          placeholder="Enter your Password"
          onClear={() => console.log("input cleared")}
          className="max-w-xs my-5"
        />

        {/* Signup button, handleSignup function ko call karta hai jab user signup kare */}
        <Button isLoading={loading} onClick={handleSignup} color="secondary">
          Sign Up
        </Button>

        <h1 className="text-center my-8">Or</h1>

        {/* Google sign-in button aapka existing code hai jo Google ke through sign in karega */}
        <Button color="secondary">
          Sign In With Google
        </Button>
      </form>
    </div>
  );
}
