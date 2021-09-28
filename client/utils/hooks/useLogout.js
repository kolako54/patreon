import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { LOGOUT } from '$api/queries'

const useLogout = () => {
    const router = useRouter()
    const [logout, { client }] = useMutation(LOGOUT, {
        onCompleted: () => {
            client.clearStore()
            router.replace('/')
        },
    })
    return logout
}

export default useLogout
