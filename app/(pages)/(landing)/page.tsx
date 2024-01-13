"use client";

import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export default function Home() {
  return (
    <>
      <Button onPress={() => {
        toast.info("Hello World!");
      }}>Primary</Button>
      <Button onPress={() => {
        toast.success("Hello World!");
      }}>Success</Button>
      <Button onPress={() => {
        toast.warning("Hello World!");
      }}>Warning</Button>
      <Button onPress={() => {
        toast.error("Hello World!");
      }}>Error</Button>
    </>
  );
}
