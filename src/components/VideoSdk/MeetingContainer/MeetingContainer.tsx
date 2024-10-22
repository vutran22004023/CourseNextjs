"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { BottomBar } from "../BottomBar";
import { SidebarConatiner } from "../SidebarContainer/SidebarContainer";
import { ParticipantsViewer } from "./ParticipantView";
import { PresenterView } from "./PresenterView";
import { useSnackbar } from "notistack";
import { nameTructed, trimSnackBarText } from "@/utils/helper";
import WaitingToJoin from "../WaitingToJoin";
import useWindowSize from "@/utils/useWindowSize";

export const sideBarModes = {
  PARTICIPANTS: "PARTICIPANTS",
  CHAT: "CHAT",
};
interface MeetingControlProps {
  onMeetingLeave: () => void; // Function to handle leaving the meeting
  setIsMeetingLeft: (status: boolean) => void; // Function to update the meeting leave status
  selectedMic: { id: string | null }; // Object representing the selected microphone, id can be a string or null
  selectedWebcam: { id: string | null }; // Object representing the selected webcam, id can be a string or null
  selectWebcamDeviceId: string | null; // Currently selected webcam device ID
  setSelectWebcamDeviceId: (id: string | null) => void; // Function to update the selected webcam device ID
  selectMicDeviceId: string | null; // Currently selected microphone device ID
  setSelectMicDeviceId: (id: string | null) => void; // Function to update the selected microphone device ID
  useRaisedHandParticipants: () => {
    participantRaisedHand: (participantId: any) => void;
  }; // Function to manage raised hand participants
  raisedHandsParticipants: Array<{
    participantId: string;
    raisedHandOn: number;
  }>; // Array of participants who raised hands, with participant ID and timestamp
  micEnabled: boolean; // Boolean flag for microphone status (on/off)
  webcamEnabled: boolean; // Boolean flag for webcam status (on/off)
}
export function MeetingContainer({
  onMeetingLeave,
  setIsMeetingLeft,
  selectedMic,
  selectedWebcam,
  selectWebcamDeviceId,
  setSelectWebcamDeviceId,
  selectMicDeviceId,
  setSelectMicDeviceId,
  useRaisedHandParticipants,
  raisedHandsParticipants,
  micEnabled,
  webcamEnabled,
}: MeetingControlProps) {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const mMeetingRef = useRef<any>();
  const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] =
    useState<boolean>(false);
  const containerRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    containerRef.current?.offsetHeight &&
      setContainerHeight(containerRef.current.offsetHeight);
    containerRef.current?.offsetWidth &&
      setContainerWidth(containerRef.current.offsetWidth);

    window.addEventListener("resize", ({ target }) => {
      containerRef.current?.offsetHeight &&
        setContainerHeight(containerRef.current.offsetHeight);
      containerRef.current?.offsetWidth &&
        setContainerWidth(containerRef.current.offsetWidth);
    });
  }, []);

  const { participantRaisedHand } = useRaisedHandParticipants();

  const _handleMeetingLeft = () => {
    setIsMeetingLeft(true);
  };

  function onParticipantJoined(participant: any) {
    // console.log(" onParticipantJoined", participant);
  }
  function onParticipantLeft(participant: any) {
    // console.log(" onParticipantLeft", participant);
  }
  const onSpeakerChanged = (activeSpeakerId: any) => {
    // console.log(" onSpeakerChanged", activeSpeakerId);
  };
  function onPresenterChanged(presenterId: any) {
    // console.log(" onPresenterChanged", presenterId);
  }
  function onMainParticipantChanged(participant: any) {
    // console.log(" onMainParticipantChanged", participant);
  }
  function onEntryRequested({ participantId, name }: any) {
    // console.log(" onEntryRequested", participantId, name);
  }
  function onEntryResponded({ participantId, name }: any) {
    // console.log(" onEntryResponded", participantId, name);
    if (mMeetingRef.current?.localParticipant?.id === participantId) {
      if (name === "allowed") {
        setLocalParticipantAllowedJoin(true);
      } else {
        setLocalParticipantAllowedJoin(false);
        setTimeout(() => {
          _handleMeetingLeft();
        }, 3000);
      }
    }
  }
  function onRecordingStarted() {
    // console.log(" onRecordingStarted");
  }
  function onRecordingStopped() {
    // console.log(" onRecordingStopped");
  }
  function onChatMessage(data: any) {
    // console.log(" onChatMessage", data);
  }
  async function onMeetingJoined() {
    // console.log("onMeetingJoined");
    const { changeWebcam, changeMic, muteMic, disableWebcam } =
      mMeetingRef.current;

    if (webcamEnabled && selectedWebcam.id) {
      await new Promise((resolve) => {
        disableWebcam();
        setTimeout(() => {
          changeWebcam(selectedWebcam.id);
          resolve();
        }, 500);
      });
    }

    if (micEnabled && selectedMic.id) {
      await new Promise((resolve) => {
        muteMic();
        setTimeout(() => {
          changeMic(selectedMic.id);
          resolve();
        }, 500);
      });
    }
  }
  function onMeetingLeft() {
    // console.log("onMeetingLeft");
    onMeetingLeave();
  }
  const onLiveStreamStarted = (data: any) => {
    // console.log("onLiveStreamStarted example", data);
  };
  const onLiveStreamStopped = (data: any) => {
    // console.log("onLiveStreamStopped example", data);
  };

  const onVideoStateChanged = (data: any) => {
    // console.log("onVideoStateChanged", data);
  };
  const onVideoSeeked = (data: any) => {
    // console.log("onVideoSeeked", data);
  };

  const onWebcamRequested = (data: any) => {
    // console.log("onWebcamRequested", data);
  };
  const onMicRequested = (data: any) => {
    // console.log("onMicRequested", data);
  };
  const onPinStateChanged = (data: any) => {
    // console.log("onPinStateChanged", data);
  };

  const mMeeting = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamStarted,
    onLiveStreamStopped,
    onVideoStateChanged,
    onVideoSeeked,
    onWebcamRequested,
    onMicRequested,
    onPinStateChanged,
  });

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const isPresenting = mMeeting.presenterId ? true : false;
  console.log(isPresenting);
  const bottomBarHeight = 60;
  const [sideBarMode, setSideBarMode] = useState(null);

  usePubSub("RAISE_HAND", {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;

      const { senderId, senderName } = data;

      const isLocal = senderId === localParticipantId;

      new Audio(
        `https://static.videosdk.live/prebuilt/notification.mp3`
      ).play();

      enqueueSnackbar(
        `${isLocal ? "You" : nameTructed(senderName, 15)} raised hand 🖐🏼`
      );

      participantRaisedHand(senderId);
    },
  });

  usePubSub("CHAT", {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;

      const { senderId, senderName, message } = data;

      const isLocal = senderId === localParticipantId;

      if (!isLocal) {
        new Audio(
          `https://static.videosdk.live/prebuilt/notification.mp3`
        ).play();

        enqueueSnackbar(
          trimSnackBarText(`${nameTructed(senderName, 15)} says: ${message}`)
        );
      }
    },
  });
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  return (
    <div
      style={{ height: windowHeight }}
      ref={containerRef}
      className="h-screen flex flex-col bg-gray-800"
    >
      {typeof localParticipantAllowedJoin === "boolean" ? (
        localParticipantAllowedJoin ? (
          <>
            <div className={` flex flex-1 flex-row bg-gray-800 `}>
              <div className={`flex flex-1 `}>
                {isPresenting ? (
                  <PresenterView height={containerHeight - bottomBarHeight} />
                ) : null}
                {isPresenting && isMobile ? null : (
                  <ParticipantsViewer
                    isPresenting={isPresenting}
                    sideBarMode={sideBarMode}
                  />
                )}
              </div>
              <SidebarConatiner
                height={containerHeight - bottomBarHeight}
                setSideBarMode={setSideBarMode}
                sideBarMode={sideBarMode}
                raisedHandsParticipants={raisedHandsParticipants}
              />
            </div>
            <BottomBar
              bottomBarHeight={bottomBarHeight}
              sideBarMode={sideBarMode}
              setSideBarMode={setSideBarMode}
              setIsMeetingLeft={setIsMeetingLeft}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
            />
          </>
        ) : (
          <></>
        )
      ) : (
        !mMeeting.isMeetingJoined && <WaitingToJoin />
      )}
    </div>
  );
}
