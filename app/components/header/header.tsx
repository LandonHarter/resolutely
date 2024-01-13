import { useAuthState } from "@/hooks/useAuthState";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import HeaderAccount from "./account";

export default async function Header() {
    const authState = await useAuthState();

    return (
        <header className="w-screen flex justify-center py-2 ">
            <Navbar classNames={{
                base: "bg-[hsl(var(--nextui-background))]",
                content: "bg-[hsl(var(--nextui-background))]",
                wrapper: "max-w-none px-20"
            }}>
                <NavbarBrand>
                    <Link href="/" className="flex items-center">
                        <Image src="/images/company/icon-transparent.png" alt="Resolutely Icon" width={1024} height={512} className="w-14" />
                    </Link>
                </NavbarBrand>
                <NavbarContent justify="center" className="gap-16">
                    <Link href="/resources"><NavbarItem className="font-semibold text-xl">Resources</NavbarItem></Link>
                    <Link href="/motivation"><NavbarItem className="font-semibold text-xl">Motivation</NavbarItem></Link>
                    <Link href="/community"><NavbarItem className="font-semibold text-xl">Community</NavbarItem></Link>
                </NavbarContent>
                <NavbarContent justify="end">
                    <HeaderAccount authState={authState} />
                </NavbarContent>
            </Navbar>
        </header>
    );
}