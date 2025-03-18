import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from '../lib/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()