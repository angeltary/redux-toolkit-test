import { api } from '@/modules/shared/api'
import type { AppDispatch, AppState, AppThunk } from '@/modules/shared/redux'
import { usersSlice, type UserId } from '../users-slice'

export const fetchUser =
  (userId: UserId): AppThunk =>
  (dispatch: AppDispatch, getState: () => AppState) => {
    const isLoading = usersSlice.selectors.selectIsFetchUserLoading(getState())

    if (!isLoading) {
      return
    }

    dispatch(usersSlice.actions.fetchUserLoading())
    api
      .getUser(userId)
      .then(user => {
        dispatch(usersSlice.actions.fetchUserSuccess({ user }))
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUserError())
      })
  }
