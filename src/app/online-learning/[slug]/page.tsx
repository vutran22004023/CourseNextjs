"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { useParams } from "next/navigation";
import { ShowDetailRoom } from "@/apis/videoSDK";
import { useMutationHook } from "@/hooks";
import { MeetingAppProvider } from "@/context/MeetingAppProvider";
import { JoiningScreen } from "./joiningScreen";
export default function page() {
  const { slug } = useParams();
  const [data, setData] = useState<any>();
  const [meetingId, setMeetingId] = useState<any>("");
  const [authToken, setAuthToken] = useState<string>("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const mutationDetailRoom = useMutationHook(async (id) => {
    try {
      const res = await ShowDetailRoom(id);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
  useEffect(() => {
    if (slug) {
      mutationDetailRoom.mutate(slug, {
        onSuccess: (data) => {
          setData(data[0]);
          setMeetingId(data[0]?.roomDetails?.roomId);
          setAuthToken(data[0]?.token);
        },
      });
    }
  }, [slug]);

  return (
    <MeetingAppProvider>
      {isMeetingStarted ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micOn,
            webcamEnabled: webcamOn,
            name: participantName ? participantName : "TestUser",
            multiStream: true,
            customCameraVideoTrack: customVideoStream,
            customMicrophoneAudioTrack: customAudioStream,
          }}
          token={authToken}
          reinitialiseMeetingOnConfigChange={true}
          joinWithoutUserInteraction={true}
        ></MeetingProvider>
      ) : (
        <JoiningScreen
          participantName={participantName}
          setParticipantName={setParticipantName}
          setMeetingId={setMeetingId}
          setToken={setAuthToken}
          micOn={micOn}
          setMicOn={setMicOn}
          webcamOn={webcamOn}
          setWebcamOn={setWebcamOn}
          customAudioStream={customAudioStream}
          setCustomAudioStream={setCustomAudioStream}
          customVideoStream={customVideoStream}
          setCustomVideoStream={setCustomVideoStream}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
        />
      )}
    </MeetingAppProvider>
  );
}
