import Header from "@/components/header/header";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}