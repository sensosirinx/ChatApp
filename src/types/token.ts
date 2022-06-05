export enum TokenActionTypes {
  FETCH_TOKEN = 'FETCH_TOKEN',
  FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR',
}

export interface TokenState {
  token: null | string
  error: null | string
}

interface FetchTokenAction {
  type: TokenActionTypes.FETCH_TOKEN
  payload: string | null
}

interface FetchTokenErrorAction {
  type: TokenActionTypes.FETCH_TOKEN_ERROR
  payload: string
}

export type TokenAction = FetchTokenAction | FetchTokenErrorAction