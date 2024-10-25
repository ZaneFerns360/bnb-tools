import React from "react";
import TeamEvaluationForm from "../_components/Form";
import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <TeamEvaluationForm username={session?.user.name?.slice(5)} />
    </div>
  );
};

export default page;
