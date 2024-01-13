"use client";

import YouTube from "react-youtube";

export default function YoutubePlayer({ video }: { video: any }) {
    return <YouTube videoId={video.id} title={video.title} style={{
        marginBottom: "120px",
    }} iframeClassName="w-[50vw] h-[28vw]" />;
}