import { useAuthState } from "./hooks/useAuthState"

export default async function Home() {
  const { user, signedIn } = await useAuthState();

  return (
    <main>
      <h1>Hello {signedIn ? user.name : "nobody"}</h1>
    </main>
  )
}
