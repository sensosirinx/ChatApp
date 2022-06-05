import { TokenAction, TokenActionTypes, TokenState } from '../../types/token'


const initialState: TokenState = {
  token: null,
  error: null
}

export const tokenReducer = (state = initialState, action: TokenAction): TokenState => {
  switch (action.type) {
    case TokenActionTypes.FETCH_TOKEN: {
      return { error: null, token: action.payload}
    }
    case TokenActionTypes.FETCH_TOKEN_ERROR: {
      return {error: action.payload, token: null}
    }
    default: {
      return state
    }
  }
}
