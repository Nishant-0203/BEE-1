import React from "react";
import { Button } from "../ui/button";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.username)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.username}</p>
      </div>
      {/* <button
        className="text-sm  p-1 rounded-md text-white hover:opacity-80"
        onClick={onLogout}
      >
        Logout
      </button> */}
      <Button
        variant="outline"
        size="sm"
        className="px-3 rounded-md hover:opacity-80"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProfileInfo;
