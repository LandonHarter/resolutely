import { Metadata } from "next"

export type MetadataProps = {
    title?: string;
    description?: string;
    path?: string;
}

const BaseTitle = "Resolutely - The #1 Way to Set and Achieve Goals";
const BaseDescription = "Resolutely is the #1 way to set and achieve goals. It's free, easy to use, and can transform your life.";
export function createMetadata(props: MetadataProps = {}): Metadata {
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL + (props.path ?? "/")),
        title: props.title ?? BaseTitle,
        description: props.description ?? BaseDescription,
        authors: [
            {
                name: "Landon Harter",
                url: "https://landonharter.me",
            },
            {
                name: "Resolutely",
                url: process.env.NEXT_PUBLIC_BASE_URL,
            }
        ],
        publisher: "Resolutely",
        robots: {
            index: true,
            follow: true,
        },
        keywords: "goals,self-help,new years",
        creator: "Landon Harter",
        applicationName: "Resolutely",
        icons: [
            {
                url: process.env.NEXT_PUBLIC_BASE_URL + "/images/company/icon-transparent.png",
            }
        ],
        openGraph: {
            title: props.title ?? BaseTitle,
            description: props.description ?? BaseDescription,
            url: process.env.NEXT_PUBLIC_BASE_URL + (props.path ?? "/"),
            type: "website",
            siteName: "Resolutely",
            images: [
                {
                    url: process.env.NEXT_PUBLIC_BASE_URL + "/images/company/logo.png"
                }
            ]
        },
        twitter: {
            cardType: "summary_large_image",
            site: process.env.NEXT_PUBLIC_BASE_URL,
            title: props.title ?? BaseTitle,
            description: props.description ?? BaseDescription,
            images: [
                {
                    url: process.env.NEXT_PUBLIC_BASE_URL + "/images/company/logo.png",
                }
            ]
        },
        alternates: {
            canonical: process.env.NEXT_PUBLIC_BASE_URL + (props.path ?? "/"),
            languages: {
                "en-US": process.env.NEXT_PUBLIC_BASE_URL + (props.path ?? "/"),
            }
        }
    } as Metadata;
}