import { makeVar } from '@apollo/client';
// export const cache = new InMemoryCache(
//     {
//     typePolicies: {
//         Query: {
//             fields: {
//                 isSignedIn: {
//                     read() {
//                         return isSignedInVar();
//                     }
//                 }
//             }
//         }
//     }
// }
// );
// const d = !!localStorage.getItem("token");
var isLoggedInVar;
if (typeof window !== 'undefined'){
    isLoggedInVar = makeVar(!!localStorage.getItem("token"));
}
export default isLoggedInVar;

