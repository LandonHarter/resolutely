"use client";

import GoalsSVG from "@/svg/goals";
import SignOutSVG from "@/svg/signout";
import { TrophySVG } from "@/svg/trophy";
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
                    <DropdownItem href="/goals" startContent={<GoalsSVG className="w-5 h-5 ml-[2px] mr-[2px]" pathClassName="stroke-[0.01px] stroke-black" />}>Your Goals</DropdownItem>
                    <DropdownItem href={"/" + authState.user.id + "/achievements"} startContent={<TrophySVG className="w-[22px] h-[22px] ml-[2px] mr-[1px]" />}>Achievements</DropdownItem>
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