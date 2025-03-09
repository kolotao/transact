import authReducer, { resetAuthState } from './authSlice'
import { loginUser } from './authThunks'

describe('authSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      user: null,
      loading: false,
      errorCode: null,
    }
    expect(authReducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle resetAuthState', () => {
    const prevState = {
      user: { id: '123', email: 'test@mail.com', firstName: '', lastName: '', createdAt: '', updatedAt: '', accounts: [] },
      loading: true,
      errorCode: 'SOME_ERROR',
    }
    const nextState = authReducer(prevState, resetAuthState())
    expect(nextState).toEqual({
      user: null,
      loading: false,
      errorCode: null,
    })
  })

  it('should handle loginUser.fulfilled', () => {
    const prevState = {
      user: null,
      loading: true,
      errorCode: null,
    }

    const action = {
      type: loginUser.fulfilled.type,
      payload: { id: 'abc', email: 'test@mail.com', firstName: '', lastName: '', createdAt: '', updatedAt: '', accounts: [] },
    }

    const nextState = authReducer(prevState, action)
    expect(nextState).toMatchObject({
      user: { id: 'abc', email: 'test@mail.com' },
      loading: false,
      errorCode: null,
    })
  })
})
