import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { redirect } from "next/navigation";
 
const Page = async () => {
  //trpc setup(feature and && new logic for fetch and required data api from server-component)

 

  const readOnly = headers();
  const mutableHeaders = new Headers();

  for (const [key, value] of (await readOnly).entries()) {
    mutableHeaders.set(key, value);
  }

  const session = await auth.api.getSession({
    headers: mutableHeaders,
  });

  if (!session) {
    redirect("/sign-in");
  }

 


  return <HomeView />;
};

export default Page;
