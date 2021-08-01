import {InMemoryCache,useReactiveVar} from "@apollo/client";

export const cache = new InMemoryCache(
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
);
