import React, { useContext } from "react";
import {Navbar,
     NavbarBrand, 
     NavbarContent, 
     NavbarItem, 
     NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem, 
    Button, 
    Avatar} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Signin from "../PAGES/Signin";
import Signup from "../PAGES/Signup";
import { AuthContext } from "../context/AuthContext";
import { div } from "framer-motion/client";
import { signOut } from "firebase/auth";
import { auth } from "../assets/utils/Firebase";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  


export default function Header() {

    const {user , setUser} = useContext(AuthContext)

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

    const handleLogoutUser = async ()=> {
       await signOut(auth)
    }


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {
            user?.isLogin ? <div className="flex flex-row justify-center items-center">
            
                <h1 style={{fontSize : '16px', paddingLeft : '42px'}}>{user?.userInfo?.email}</h1>
                <Button onClick={handleLogoutUser} color="primary" variant="light">Logout</Button>
            </div> 
                
            
            :
        <NavbarItem className="hidden lg:flex">
          <Link to={'/signin'}>Login</Link>
        </NavbarItem>
        }
        {
            user?.isLogin ?
            <Avatar src={user?.userInfo?.photoURL} size="md"/>
            : 
        <NavbarItem>
          <Button as={Link} color="primary" to={'/signup'} variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        }
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
