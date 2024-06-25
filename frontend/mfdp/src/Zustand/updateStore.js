import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUpdateStore = create(
    devtools(
        persist(
            (set) => ({
                updates: [],

                getUpdate: (data) => set((state) => ({
                    updates: [data]
                })),

                removeOne: (data) => set((state) => ({
                    updates: state.updates.filter((item) => item !== data)
                }))
            }),
            {
                name: "All new Updates"
            }
        )
    )
)

export default useUpdateStore;