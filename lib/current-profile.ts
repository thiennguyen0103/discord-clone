import { db } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = db.profile.findUnique({
    where: {
      userId: userId,
    },
  });
  return profile;
};
