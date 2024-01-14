import SearchSVG from "@/svg/search";
import { createMetadata } from "@/utils/metadata";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const metadata = createMetadata({
    title: "Resources | Resolutely",
    description: "Resources to help you on your journey."
});
export default function ResourcesPage() {
    function Category({ name, numResources, id }: { name: string, numResources: number, id: string }) {
        return (
            <Link href="/resources" className="flex p-4 border-2 border-gray-200 rounded-xl">
                <Image src={"/images/categories/" + id + ".svg"} alt={name} width={60} height={60} className="rounded-full mr-4" />
                <div className="flex flex-col">
                    <h1 className="text-xl font-medium">{name}</h1>
                    <p className="text-gray-500">{numResources} resources</p>
                </div>
            </Link>
        );
    }

    return (
        <main className="w-screen flex flex-col items-center">
            <div className="w-full flex flex-col items-center mt-[150px] mb-12">
                <h3 className="text-2xl text-[hsl(var(--resolutely-primary-500))] font-semibold mb-4">Resources</h3>
                <h1 className="text-6xl font-bold mb-6">All in one collection of self-help resources.</h1>
                <p className="text-2xl text-gray-500">Making habits and goals is easy. Sticking to them is the hard part.</p>
            </div>
            <Input variant="faded" startContent={<SearchSVG className="w-7 h-7 mr-2" pathClassName="stroke-gray-600" />}
                placeholder="Search for a resource..." className="max-w-[1200px] w-[80vw] mx-auto mb-8" classNames={{
                    inputWrapper: "rounded-2xl",
                    input: "text-lg"
                }} />
            <div className="max-w-[1200px] w-[80vw] flex flex-col">
                <h1 className="text-3xl font-semibold mb-4">Categories</h1>
                <div className="w-full grid grid-cols-4 grid-rows-2 gap-4">
                    <Category name="Books" numResources={84} id="books" />
                    <Category name="Videos" numResources={46} id="videos" />
                    <Category name="Articles" numResources={25} id="articles" />
                    <Category name="Workout Plans" numResources={13} id="workout" />
                    <Category name="Habits" numResources={30} id="habits" />
                    <Category name="Diet Plans" numResources={7} id="diet" />
                    <Category name="Goals" numResources={80} id="goals" />
                    <Link href="/resources" className="flex p-4 border-2 border-gray-200 rounded-xl">
                        <Image src="/images/categories/more.svg" alt="other" width={60} height={60} className="rounded-full mr-4" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-medium">More</h1>
                            <p className="text-gray-500">50+ categories</p>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}