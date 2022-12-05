import { apiSlice } from "../../app/api/ApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addToBeVisitedMonument: builder.mutation({
            query: ({userId, monumentId}) => ({
                url: `/user/toVisit/${userId}`,
                method: 'POST',
                body: {monumentId}
            }),
            invalidatesTags: (res, err, arg) => {
                return [{type: "Monument", id: "TOBEVISITED"}]
            }
        }),
        addVisitedMonument: builder.mutation({
            query: ({userId, monumentId}) => ({
                url: `/user/visited/${userId}`,
                method: 'POST',
                body: {monumentId}
            }),
            invalidatesTags: (res, err, arg) => {
                return [{type: "Monument", id: "VISITED"}]
            }
        }),
        getToBeVisitedMonument: builder.query({
            query: ({userId}) => ({
                url: `/user/toVisit/${userId}`,
                method: 'GET',
            }),
            providesTags: (res, err, arg) => {
                return [{type: "Monument", id: "TOBEVISITED"}]
            }
        }),
        getVisitedMonument: builder.query({
            query: ({userId}) => ({
                url: `/user/visited/${userId}`,
                method: 'GET',
            }),
            providesTags: (res, err, arg) => {
                return [{type: "Monument", id: "VISITED"}]
            }
        }),
        addNewUser: builder.mutation({
            query: (body) => ({
                url: `/user`,
                method: 'POST',
                body: body
            })
        })
    })
});

export const {
   useAddToBeVisitedMonumentMutation,
   useAddVisitedMonumentMutation,
   useGetToBeVisitedMonumentQuery,
   useGetVisitedMonumentQuery,
   useAddNewUserMutation
} = userApiSlice;