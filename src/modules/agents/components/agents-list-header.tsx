"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentsListHeader = () => {
    const [isDialogOpen,setisDialogOpen] = useState(false);



  return (
    <>

    <NewAgentDialog open={isDialogOpen} onOpenChange={setisDialogOpen}/>
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between rounded-2xl p-4 bg-green-950 "><h5 className="text-2xl font-bold text-white ]">
          My Agents
        </h5>
        <Button 
        className="bg-[#021812] text-white hover:bg-[#abafae] transition-all"
        onClick={()=>setisDialogOpen(true)}
        >
         <PlusIcon/>
          New Agent
        </Button>
      </div>
    </div>
    </>
  );
};
