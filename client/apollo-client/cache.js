import {InMemoryCache} from "@apollo/client";
import {dummyDataVar} from "$apollo/store";


export const cache = new InMemoryCache(
    {
        typePolicies: {
            Query: {
                fields: {
                    dummyData: {
                        read() {
                            return dummyDataVar();
                        }
                    }
                }
            }
        }
    }
);


