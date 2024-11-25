import { name as auth, authSliceReducer } from '@/features/auth/model/authSlice'
import {
  name as posts,
  postsSliceReducer,
} from '@/features/posts/model/postsSlice'
import {
  name as users,
  usersSliceReducer,
} from '@/features/users/model/usersSlice'
import {
  name as notifications,
  notificationsReducer,
} from '@/features/notifications/model/notificationSlice'
import { configureStore } from '@reduxjs/toolkit'
import { name as app, appSliceReducer } from './appSlice'
import { listenerMiddleware } from './listenerMiddleware'
import { apiSlice } from '@/features/api/apiSlice'

export const store = configureStore({
  reducer: {
    [auth]: authSliceReducer,
    [users]: usersSliceReducer,
    [posts]: postsSliceReducer,
    [notifications]: notificationsReducer,
    [app]: appSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => {
    return gDM()
      .prepend(listenerMiddleware.middleware)
      .concat(apiSlice.middleware)
  },
})

type Store = typeof store
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
