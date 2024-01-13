import { getServerSession } from "next-auth";
import Providers from "./components/providers";
import "./globals.scss";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata();
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
