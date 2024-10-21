'use client'
import { Avatar, useTheme } from "@mui/material";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

import React, { useMemo } from "react";
import MicOffIcon from "@/assets/iconSvg/MicOffIcon";
import MicOnIcon from "@/assets/iconSvg/MicOnIcon";
import RaiseHand from "@/assets/iconSvg/RaiseHand";
import VideoCamOffIcon from "@/assets/iconSvg/VideoCamOffIcon";
import VideoCamOnIcon from "@/assets/iconSvg/VideoCamOnIcon";
import { nameTructed } from "@/utils/helper";

function ParticipantListItem({ participantId, raisedHand, pId }) {
  const { micOn, webcamOn, displayName, isLocal } =
    useParticipant(participantId);

  const theme = useTheme();

  return (
    <div
      key={`participant_${participantId}`}
      className="mt-2 m-2 p-2 bg-gray-700 rounded-lg mb-0"
    >
      <div className="flex flex-1 items-center justify-center relative">
        <Avatar variant={"rounded"}>{displayName?.charAt(0)}</Avatar>
        <div className="ml-2 mr-1 flex flex-1">
          <p className="text-base text-white overflow-hidden whitespace-pre-wrap overflow-ellipsis">
            {isLocal ? "You" : nameTructed(displayName, 15)}
          </p>
        </div>
        {raisedHand && (
          <div className="flex items-center justify-center m-1 p-1">
            <RaiseHand fillColor={theme.palette.common.white} />
          </div>
        )}
        <div className="m-1 p-1">{micOn ? <MicOnIcon /> : <MicOffIcon />}</div>
        <div className="m-1 p-1">
          {webcamOn ? <VideoCamOnIcon /> : <VideoCamOffIcon />}
        </div>
      </div>
    </div>
  );
}

export function ParticipantSidePanel({ panelHeight, raisedHandsParticipants }) {
  const mMeeting = useMeeting();
  const participants = mMeeting.participants;

  const sortedRaisedHandsParticipants = useMemo(() => {
    const participantIds = [...participants.keys()];

    const notRaised = participantIds.filter(
      (pID) =>
        raisedHandsParticipants.findIndex(
          ({ participantId: rPID }) => rPID === pID
        ) === -1
    );

    const raisedSorted = raisedHandsParticipants.sort((a, b) => {
      if (a.raisedHandOn > b.raisedHandOn) {
        return -1;
      }
      if (a.raisedHandOn < b.raisedHandOn) {
        return 1;
      }
      return 0;
    });

    const combined = [
      ...raisedSorted.map(({ participantId: p }) => ({
        raisedHand: true,
        participantId: p,
      })),
      ...notRaised.map((p) => ({ raisedHand: false, participantId: p })),
    ];

    return combined;
  }, [raisedHandsParticipants, participants]);

  const filterParticipants = (sortedRaisedHandsParticipants) =>
    sortedRaisedHandsParticipants;

  const part = useMemo(
    () => filterParticipants(sortedRaisedHandsParticipants, participants),

    [sortedRaisedHandsParticipants, participants]
  );

  return (
    <div
      className={`flex w-full flex-col bg-gray-750 overflow-y-auto `}
      style={{ height: panelHeight }}
    >
      <div
        className="flex flex-col flex-1"
        style={{ height: panelHeight - 100 }}
      >
        {[...participants.keys()].map((participantId, index) => {
          const { raisedHand, participantId: peerId } = part[index];
          return (
            <div key={`participant_${peerId}`}>
              <ParticipantListItem
                participantId={peerId}
                raisedHand={raisedHand}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
