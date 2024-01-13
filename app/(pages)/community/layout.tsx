import Header from "@/components/header/header";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}