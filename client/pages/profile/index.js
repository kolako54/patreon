import Layout from "$components/Layout";
import Profile from "$components/Profile";
import {useSession} from "next-auth/client";
import { GET_ME } from "pages/api/queries";
import { useQuery } from "@apollo/client";
export default function ProfilePage() {
    const {data, error, loading} = useQuery(GET_ME);
    return (
        <Layout title={data && data.get_me.name + ' | Patreon'}>
            <Profile/>
        </Layout>
    )
}

ProfilePage.authOptions = {
    auth: true,
    autoLogin: true
}