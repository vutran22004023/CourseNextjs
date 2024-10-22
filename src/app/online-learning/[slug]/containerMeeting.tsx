"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useParams } from "next/navigation";
import { ShowDetailRoom } from "@/apis/videoSDK";
import { useMutationHook } from "@/hooks";
import { LeaveScreen } from "@/components/VideoSdk/LeaveScreen";
import { SnackbarProvider } from "notistack";
import { MeetingContainer } from "@/components/VideoSdk/MeetingContainer/MeetingContainer";
import { JoiningScreen } from "@/components/VideoSdk/JoiningScreen";
import { ThemeProvider, useMediaQuery, useTheme } from "@mui/material";

type SelectedDevice = {
  id: string | null;
};

type RoomDetails = {
  roomId: string;
};

type RoomData = {
  roomDetails: RoomDetails;
  token: string;
};

type RaisedHandParticipant = {
  participantId: string;
  raisedHandOn: number;
};

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<RoomData | null>(null);
  const [meetingId, setMeetingId] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const [micOn, setMicOn] = useState<boolean>(true);
  const [webcamOn, setWebcamOn] = useState<boolean>(true);
  const [selectedMic, setSelectedMic] = useState<SelectedDevice>({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState<SelectedDevice>({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState<string | null>(
    selectedWebcam.id
  );
  const [selectMicDeviceId, setSelectMicDeviceId] = useState<string | null>(
    selectedMic.id
  );
  const [isMeetingStarted, setMeetingStarted] = useState<boolean>(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState<boolean>(false);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState<RaisedHandParticipant[]>([]);

  const useRaisedHandParticipants = () => {
    const raisedHandsParticipantsRef = useRef<RaisedHandParticipant[]>([]);

    const participantRaisedHand = (participantId: string) => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

      const newItem: RaisedHandParticipant = { participantId, raisedHandOn: new Date().getTime() };

      const participantFound = raisedHandsParticipants.findIndex(
        ({ participantId: pID }) => pID === participantId
      );

      if (participantFound === -1) {
        raisedHandsParticipants.push(newItem);
      } else {
        raisedHandsParticipants[participantFound] = newItem;
      }

      setRaisedHandsParticipants(raisedHandsParticipants);
    };

    useEffect(() => {
      raisedHandsParticipantsRef.current = raisedHandsParticipants;
    }, [raisedHandsParticipants]);

    const _handleRemoveOld = () => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];
      const now = new Date().getTime();

      const persisted = raisedHandsParticipants.filter(({ raisedHandOn }) => {
        return parseInt(raisedHandOn.toString()) + 15000 > parseInt(now.toString());
      });

      if (raisedHandsParticipants.length !== persisted.length) {
        setRaisedHandsParticipants(persisted);
      }
    };

    useEffect(() => {
      const interval = setInterval(_handleRemoveOld, 1000);
      return () => {
        clearInterval(interval);
      };
    }, []);

    return { participantRaisedHand };
  };

  const theme = useTheme();
  const isXStoSM = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    if (isXStoSM) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isXStoSM]);

  const mutationDetailRoom = useMutationHook(async (id: string) => {
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
        onSuccess: (data: RoomData[]) => {
          setData(data[0]);
          // setMeetingId(data[0]?.roomDetails?.roomId);
          setAuthToken(data[0]?.token);
        },
      });
    }
  }, [slug]);

  return (
    <>
      {isMeetingStarted ? (
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={5000}
          maxSnack={3}
        >
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
            }}
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjNjhiYjUwMC0zNTk1LTQxY2YtYjk4Ny1mYjU4NTcxYWYxOWEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyOTUwNzEyNywiZXhwIjoxNzMwMTExOTI3fQ.vhmOfXPwsmOXwfaXeWWkXSVvgrNAJ9MeIOViiMHo-yU"
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setAuthToken("");
                setMeetingId("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              useRaisedHandParticipants={useRaisedHandParticipants}
              raisedHandsParticipants={raisedHandsParticipants}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
            />
          </MeetingProvider>
        </SnackbarProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <JoiningScreen
          participantName={participantName}
          setParticipantName={setParticipantName}
          setMeetingId={setMeetingId}
          setToken={setAuthToken}
          setMicOn={setMicOn}
          micEnabled={micOn}
          webcamEnabled={webcamOn}
          setSelectedMic={setSelectedMic}
          setSelectedWebcam={setSelectedWebcam}
          setWebcamOn={setWebcamOn}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
          token={authToken}
          meetingId={meetingId}
        />
      )}
    </>
  );
}
