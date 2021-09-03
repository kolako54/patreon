import {makeVar} from '@apollo/client';

export const dummyDataVar = makeVar({likes: 405, isLiked: false})
let isLoggedInVar;
if (typeof window !== 'undefined') {
    isLoggedInVar = makeVar(!!localStorage.getItem("token"));
}
export {isLoggedInVar}
