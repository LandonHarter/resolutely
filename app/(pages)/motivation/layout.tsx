import Header from "@/components/header/header";

export default function MotivationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
}