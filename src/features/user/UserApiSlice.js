import { apiSlice } from "../../app/api/ApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addToBeVisitedMonument: builder.mutation({
            query: ({userId, monumentId}) => ({
                url: `/users/${userId}/toVisitMonument`,
                method: 'POST',
                body: {monumentId}
            })
        })
    })
});

export const {
   
} = userApiSlice;