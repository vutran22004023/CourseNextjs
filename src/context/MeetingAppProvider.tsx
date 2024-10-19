import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

// Define the types for your context state
interface Participant {
  participantId: string;
  raisedHandOn: number;
}

interface MeetingAppContextType {
  selectedMic: { id: string | null; label: string | null };
  setSelectedMic: React.Dispatch<
    React.SetStateAction<{ id: string | null; label: string | null }>
  >;
  selectedWebcam: { id: string | null; label: string | null };
  setSelectedWebcam: React.Dispatch<
    React.SetStateAction<{ id: string | null; label: string | null }>
  >;
  selectedSpeaker: { id: string | null; label: string | null };
  setSelectedSpeaker: React.Dispatch<
    React.SetStateAction<{ id: string | null; label: string | null }>
  >;
  raisedHandsParticipants: Participant[];
  setRaisedHandsParticipants: React.Dispatch<
    React.SetStateAction<Participant[]>
  >;
  sideBarMode: string | null;
  setSideBarMode: React.Dispatch<React.SetStateAction<string | null>>;
  pipMode: boolean;
  setPipMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCameraPermissionAllowed: boolean | null;
  setIsCameraPermissionAllowed: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  isMicrophonePermissionAllowed: boolean | null;
  setIsMicrophonePermissionAllowed: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  useRaisedHandParticipants: () => {
    participantRaisedHand: (participantId: string) => void;
  };
}

// Provide a default value for the context, in this case `undefined`
export const MeetingAppContext = createContext<
  MeetingAppContextType | undefined
>(undefined);

// Custom hook to use the context
export const useMeetingAppContext = (): MeetingAppContextType => {
  const context = useContext(MeetingAppContext);
  if (!context) {
    throw new Error(
      "useMeetingAppContext must be used within a MeetingAppProvider"
    );
  }
  return context;
};

// Define the provider's props
interface MeetingAppProviderProps {
  children: ReactNode;
}

export const MeetingAppProvider: React.FC<MeetingAppProviderProps> = ({
  children,
}) => {
  const [selectedMic, setSelectedMic] = useState<{
    id: string | null;
    label: string | null;
  }>({ id: null, label: null });
  const [selectedWebcam, setSelectedWebcam] = useState<{
    id: string | null;
    label: string | null;
  }>({ id: null, label: null });
  const [selectedSpeaker, setSelectedSpeaker] = useState<{
    id: string | null;
    label: string | null;
  }>({ id: null, label: null });
  const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] = useState<
    boolean | null
  >(null);
  const [isMicrophonePermissionAllowed, setIsMicrophonePermissionAllowed] =
    useState<boolean | null>(null);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState<
    Participant[]
  >([]);
  const [sideBarMode, setSideBarMode] = useState<string | null>(null);
  const [pipMode, setPipMode] = useState<boolean>(false);

  const useRaisedHandParticipants = () => {
    const raisedHandsParticipantsRef = useRef(raisedHandsParticipants);

    const participantRaisedHand = (participantId: string) => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

      const newItem = { participantId, raisedHandOn: new Date().getTime() };

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
        return raisedHandOn + 15000 > now;
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

  return (
    <MeetingAppContext.Provider
      value={{
        raisedHandsParticipants,
        selectedMic,
        selectedWebcam,
        selectedSpeaker,
        sideBarMode,
        pipMode,
        isCameraPermissionAllowed,
        isMicrophonePermissionAllowed,
        setRaisedHandsParticipants,
        setSelectedMic,
        setSelectedWebcam,
        setSelectedSpeaker,
        setSideBarMode,
        setPipMode,
        useRaisedHandParticipants,
        setIsCameraPermissionAllowed,
        setIsMicrophonePermissionAllowed,
      }}
    >
      {children}
    </MeetingAppContext.Provider>
  );
};
