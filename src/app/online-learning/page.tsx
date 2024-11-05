import React from "react";
import Button from "@/components/Button/Button";
import CardRoom from "./cardRoom";
import CreateRoom from './createRoom';
import JoinRoom from './joinRoom';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Học Online',
}
export default function page() {
  return (
    <div className="mt h-full overflow-y-auto">
      <div className="flex gap-4 mt-10">
        <div className="w-[80%]">
          <CardRoom />
        </div>
        <div className="flex-auto">
          <CreateRoom/>
          <JoinRoom/>
        </div>
      </div>
    </div>
  );
}
