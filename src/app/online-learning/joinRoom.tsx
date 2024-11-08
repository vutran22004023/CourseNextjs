'use client'
import React from 'react';
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/text";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Button as ButtonUi} from "@/components/ui/button";
import {useAtoms} from "@/hooks/useAtom";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";

const JoinRoom = () => {
    const {t} = useTranslation('common');
    const [openModal, setOpenModal] = React.useState(false);
    const [roomCode, setRoomCode] = React.useState("");
    const router = useRouter();
    const {room} = useAtoms();
    console.log(room);
    const handleInputChange = (e:any) => {
        setRoomCode(e.target.value);
    };
    const handleJoinRoom = () => {
        const matchedCourse = room.find(room => room._id === roomCode);
        if (matchedCourse) {
            router.push(`/online-learning/${matchedCourse._id}`);
        } else {
            alert("Course not found");
        }
    };
    return (
        <Modal
            isOpen={openModal}
            setIsOpen={setOpenModal}
            triggerContent={
                <Button
                    type="courseHeader"
                    className="p-2 flex flex-row justify-center mt-2"
                >
                    {t('OnlineLearning.JoinClass')}
                </Button>
            }
            contentHeader={<Text type="subtitle">{t('OnlineLearning.JoinRoom')}</Text>}
            contentBody={
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">{t('OnlineLearning.CodeRoom')}</Label>
                    <Input
                        type="text"
                        id="roomCode"
                        placeholder="Nhập mã Room"
                        value={roomCode}
                        onChange={handleInputChange}
                    />
                </div>
            }
            contentFooter={
                <ButtonUi onClick={handleJoinRoom}>
                    {t('OnlineLearning.CodeRoom')}
                </ButtonUi>
            }
        />
    );
};

export default JoinRoom;