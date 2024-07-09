import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen">
      {/* <button onClick={() => setShowNav(!showNav)}>
        <IoMenu />
      </button> */}
      <div className="flex">
        <Nav show={showNav}/>
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 p-4 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
