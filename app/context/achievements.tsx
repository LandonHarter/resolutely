"use client";

import { Achievement } from "@/types/Achievements";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const AchievementContext = createContext<{
    achievement: Achievement | null;
    setAchievement: (achievement: Achievement) => void;
    openModal: () => void;
}>({
    achievement: null,
    setAchievement: () => { },
    openModal: () => { },
});
export function AchievementProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [achievement, setAchievement] = useState<Achievement | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { width, height } = useWindowSize();

    return (
        <AchievementContext.Provider value={{ achievement, setAchievement, openModal: onOpen }}>
            {children}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton backdrop="blur">
                <ModalContent className="flex flex-col">
                    {(onClose) => {
                        if (!achievement) return;
                        return (
                            <>
                                <ModalHeader className="w-full flex items-center justify-between">
                                    <h1>New Achievement</h1>
                                    <Link href={"/" + session?.user.id + "/achievements"}><Button color="primary" variant="light" className="font-medium text-[hsl(var(--resolutely-primary-600))]" onPress={() => {
                                        onClose();
                                    }}>VIEW ALL</Button></Link>
                                </ModalHeader>
                                <ModalBody className="flex flex-row mb-4">
                                    <Image src={"/images/achievements/" + achievement.id + ".svg"} alt={achievement.name} width={85} height={85} />
                                    <div className="flex flex-col ml-2">
                                        <h1 className="text-2xl font-medium">{achievement.name}</h1>
                                        <p className="text-gray-500">{achievement.description}</p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>

                                </ModalFooter>
                            </>
                        );
                    }}
                </ModalContent>
                <Confetti width={width} height={height} run={isOpen} />
            </Modal>
        </AchievementContext.Provider>
    );
}

export function useAchievement() {
    return useContext(AchievementContext);
}