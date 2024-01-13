"use client";

import SignOutSVG from "@/svg/signout";
import { AuthState } from "@/types/AuthState";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export default function HeaderAccount({ authState }: { authState: AuthState }) {
    function signedInUI() {
        if (!authState.user) return;
        return (
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar src={authState.user.image} showFallback className="cursor-pointer transition-all" />
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem color="danger" className="group" startContent={<SignOutSVG className="w-6 h-6 mr-[3px]" pathClassName="fill-none stroke-2 stroke-red-500 transition-all group-hover:stroke-white" />} onPress={() => {
                        signOut();
                    }}>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    function signedOutUI() {
        return (
            <Button color="primary" onPress={async () => {
                await signIn("google");
            }} className="font-medium">Sign In</Button>
        )
    }

    return authState.signedIn ? signedInUI() : signedOutUI();
}