import { api } from '@/modules/shared/api'
import type { AppDispatch, AppState, AppThunk } from '@/modules/shared/redux'
import { usersSlice } from '../users-slice'

export const fetchUsers =
  ({ refetch }: { refetch?: boolean } = {}): AppThunk<Promise<void>> =>
  async (dispatch: AppDispatch, getState: () => AppState) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState())

    if (!isIdle && !refetch) {
      return
    }

    dispatch(usersSlice.actions.fetchUsersLoading())
    return api
      .getUsers()
      .then(users => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users }))
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersError())
      })
  }
