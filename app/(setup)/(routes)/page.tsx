import InitialModal from "@/components/modals/initial-modal";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/prismaDb";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  // get profile from database
  const profile = await initialProfile();

  // get server by profile id
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitialModal />;
};

export default SetupPage;
