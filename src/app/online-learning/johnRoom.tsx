"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { ShowDetailRoom } from "@/apis/videoSDK";
import ReactPlayer from "react-player";


export default function johnRoom() {
  const [dataDetail, setDataDetail] = useState<any>();
  console.log(dataDetail);
  const [meetingId, setMeetingId] = useState();

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id?: string) => {
    const fetchDetailRoom =   await ShowDetailRoom('6710bd4463ec8346ca76f611');
    console.log(fetchDetailRoom)
    setDataDetail(fetchDetailRoom);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setDataDetail(null);
  };
  
  function ParticipantView({ participantId }: { participantId: string }) {
    return null;
  }
  
  function Controls() {
    return null;
  }
  
  function MeetingView({
    onMeetingLeave,
    meetingId,
  }: {
    onMeetingLeave: () => void;
    meetingId: string;
  }) {
    return null;
  }
  
  function JoinScreen({
      getMeetingAndToken,
    }: {
      getMeetingAndToken: (meeting?: string) => void;
    }) {
      const [meetingId, setMeetingId] = useState<string | undefined>();
      const onClick = async () => {
        getMeetingAndToken(meetingId);
      };
      return (
        <div>
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
          />
          <button onClick={onClick}>Join</button>
          {" or "}
          <button onClick={onClick}>Create Meeting</button>
        </div>
      );
    }
  return dataDetail?.token && dataDetail?.roomDetails?.roomId ? (
    <MeetingProvider
      config={{
        meetingId:dataDetail?.roomDetails?.roomId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={dataDetail?.token}
    >
      <MeetingView meetingId={dataDetail?.roomDetails?.roomId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );;
}
