import { UsersState } from '@/lib/interfaces/users.interface'
import { RootState } from '@/lib/store'
import { createDraftSafeSelectorCreator, createSlice, weakMapMemoize } from '@reduxjs/toolkit'

const initialState: UsersState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      if (action.payload) state.users = action.payload;
    },
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { setUsers } = usersSlice.actions

// Export the slice reducer as the default export
export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users.users;

const createWeakMapDraftSafeSelector = createDraftSafeSelectorCreator(weakMapMemoize);

const selectSelf = (state: RootState) => state
export const selectAllUsersMasked = createWeakMapDraftSafeSelector(
  selectSelf,
  (state) => {
    if (state.users.users) {
      return state.users.users.map((user) => {
        const maskedEmail = user.email.replace(/^(.{2})[^@]+/, "$1xxx");
        return {...user, email: maskedEmail}
      });
    }
  }
)