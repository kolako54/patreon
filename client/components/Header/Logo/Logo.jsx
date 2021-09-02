import Link from 'next/link'
import {useSession} from "next-auth/client";
import {motion} from "framer-motion";
import { GET_ME } from 'pages/api/queries';
import { useQuery } from '@apollo/client';
const pathVariants = {
    hidden: {
        pathLength: 0,
        fill: "rgba(136,136,136, 0)"
    },
    visible: {
        pathLength: 1,
        fill: "rgba(136,136,136, 1)",
        transition: {
            duration: 2,
            ease: "circIn",
            repeat: Infinity
        }
    }
};
export default function Logo() {
    const {error, data, loading } = useQuery(GET_ME);
    return (
        <Link href={data ? '/home' : '/'} passHref>
            <svg
                xmlns="http://www.w3.org/2000/svg" version="1.0" width="40.000000pt"
                height="40.000000pt" viewBox="0 0 66.000000 79.000000"
                preserveAspectRatio="xMidYMid meet">
                <g
                    transform="translate(0.000000,79.000000) scale(0.100000,-0.100000)" fill="#888"
                    stroke="none">
                    <motion.path
                        variants={pathVariants}
                        initial="hidden"
                        animate="visible"
                        stroke="#999"
                        strokeLinecap="square"
                        strokeLinejoin="bevel"
                        strokeWidth={10}
                        d="M170 513 c-85 -146 -157 -270 -158 -274 -2 -5 39 -9 92 -9 l96 0 61 -105 c34 -58 64 -105 68 -105 3 0 33 47 66 104 l60 105 97 3 97 3 -155 265 c-86 146 -158 268 -162 272 -4 3 -77 -113 -162 -259z m273 -28 c59 -101 107 -189 107 -195 0 -6 -26 -10 -62 -10 l-63 0 -45 -80 c-25 -44 -47 -80 -50 -80 -3 0 -26 35 -50 78 l-45 77 -68 3 c-37 2 -67 5 -67 7 0 9 224 385 229 385 3 0 54 -84 114 -185z"/>
                </g>
            </svg>
        </Link>
    )
}
