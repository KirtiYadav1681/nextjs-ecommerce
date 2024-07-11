import Link from "next/link";
import React from "react";
import { MdOutlineSettings } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaBoxOpen, FaStarOfLife } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/router";
import { BiSolidCategory, BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

const links = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: <IoHome />,
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
    icon: <CiViewList />,
  },
  {
    id: 5,
    name: "Categories",
    path: "/categories",
    icon: <BiSolidCategory />,
  },
  {
    id: 3,
    name: "Orders",
    path: "/orders",
    icon: <FaBoxOpen />,
  },
  {
    id: 4,
    name: "Settings",
    path: "/settings",
    icon: <MdOutlineSettings />,
  },
];

const Layout = ({show}) => {
  const pathname = useRouter().pathname;
  const router = useRouter();

  const inactiveLink = {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    padding: "5px 8px",
  };

  let activeLink = {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    padding: "5px 8px",
    backgroundColor: "white",
    color: "rgb(30,58,138)",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  };

  async function logout(){
    await router.push('/');
    await signOut();
  }

  return (
    <aside
      className="bg-blue-900 min-h-screen"
      style={{ color: "white", padding: "12px 0 12px 12px" }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginRight: "12px",
          marginBottom: "16px",
        }}
      >
        <FaStarOfLife />
        <span>EcommerceAdmin</span>
      </Link>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.path}
            style={pathname == link.path ? activeLink : inactiveLink}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
        <button onClick={logout} style={inactiveLink}>
          <BiLogOut />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Layout;
