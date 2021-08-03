import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSession} from "next-auth/client";

export default function Home() {
    const router = useRouter()
    const [session] = useSession()

    useEffect(() => {
        if (session === null)
            router.push('/login')
    }, [router, session])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
