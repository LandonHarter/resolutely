"use client";

import { useAchievement } from "@/context/achievements";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { setAchievement, openModal } = useAchievement();

  return (
    <>
      <Button onPress={() => {
        setAchievement({
          id: "streak",
          name: "Streak",
          description: "Get a streak of 3 days.",
        })
        openModal();
      }}>Claim Achivement</Button>
    </>
  );
}
