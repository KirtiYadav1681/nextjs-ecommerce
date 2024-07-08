import Image from "next/image";
import Layout from "./layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex items-center bg-gray-300 gap-1 text-black rounded-lg overflow-hidden pr-2">
          <Image
            src={session?.user?.image}
            alt="user-img"
            height={30}
            width={30}
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
