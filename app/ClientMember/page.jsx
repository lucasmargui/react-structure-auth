import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const fetchData = async () => {
  const session = await useSession({ required: true });
  return session;
};

const Member = () => {
  const session = fetchData();
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/ClientMember");

    return null; // or loading indicator
  }

  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
