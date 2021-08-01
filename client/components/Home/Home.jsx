import {isSignedInVar} from "$apollo/store";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter()
    return (
        <div><h1>Home</h1></div>
    )
}
