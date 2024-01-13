import YoutubePlayer from "./video";

const youtubesearchapi = require("youtube-search-api");

export default async function MotivationPage() {
    const quoteRequest = await fetch("https://quotenjoke.onrender.com/quote", {
        method: "GET",
        cache: "no-cache",
    });
    const quote = await quoteRequest.json() as { content: string, author: string };

    const video = (await youtubesearchapi.GetListByKeyword("motivational", false, 25, [
        { type: "video" }
    ])).items[Math.floor(Math.random() * 25)];
    console.log(video);

    return (
        <main className="w-full flex flex-col items-center">
            <div className="flex flex-col mt-[120px]">
                <h1 className="text-center font-semibold text-6xl mb-6">Motivational Quote</h1>
                <p className="text-center text-gray-500 text-2xl mb-8">Something motivational to help bring you through your day.</p>
                <div className="max-w-[900px] p-6 border-2 border-gray-200 shadow-2xl rounded-xl">
                    <span className="text-3xl">{quote.content} - <i>{quote.author}</i></span>
                </div>
            </div>
            <div className="flex flex-col mt-[300px]">
                <h1 className="text-center font-semibold text-6xl mb-6">Motivational Video</h1>
                <p className="text-center text-gray-500 text-2xl mb-8">Watch a short video to lift yourself up.</p>
                <YoutubePlayer video={video} />
            </div>
        </main>
    );
}