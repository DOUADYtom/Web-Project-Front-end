import { apiSlice } from "../../app/api/ApiSlice";

export const monumentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMonuments: builder.query({
            query: ({limit, sort}) => `/monument?${limit!==undefined && `limit=${limit}`}&${sort!==undefined && `sort=${sort}`}`,
            providesTags: (res, err, arg) => {
                if(Array.isArray(res)){
                    return [
                        {type: "Monument", id: "LIST"},
                        ...res.map(({_id}) => ({type: "Monument", id: _id}))
                    ]
                } else return [{type: "Monument", id: "LIST"}]
            }
        }),
        getMonumentById: builder.query({
            query: ({id}) => `/monument/${id}`,
            providesTags: (res, err, arg) => {
                return [{type: "Monument", id: res._id}]
            }
        })
    })
});

export const {
    useGetMonumentsQuery,
    useGetMonumentByIdQuery
} = monumentApiSlice