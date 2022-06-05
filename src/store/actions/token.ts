import { Dispatch } from 'redux'
import { TokenAction, TokenActionTypes } from '../../types/token'
import config from '../../config.json'
import axios from 'axios'


export const requestToken = () => {
  return async (dispatch: Dispatch<TokenAction>) => {
    try {
      const params = {
        "email": config.email,
        "password": config.password,
        "appId": config.appId
      }
      let token = getLocalToken()
      const tokenIsValid = token ? await checkValidToken() : false
      if (!token || !tokenIsValid) {
        const response = await axios.post(config.tokenUrl, params)
        token = response.data && response.data.data
        token = JSON.stringify(token)
      }
      if (token) {
        sessionStorage.setItem('token', token)
        dispatch({type: TokenActionTypes.FETCH_TOKEN, payload: token})
      } else {
        dispatch({type: TokenActionTypes.FETCH_TOKEN_ERROR, payload: 'ошибка получения токена'})
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'произошла ошибка'
      dispatch({type: TokenActionTypes.FETCH_TOKEN_ERROR, payload: message})
    }
  }
}

export const getLocalToken = () => {
  return sessionStorage.getItem('token') || ''
}

const checkValidToken = async () => {
  const token  = JSON.parse(getLocalToken())
  const headers = {
    "Authorization": token.accessToken,
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
  const response = await axios.get(config.tokenCheckUrl, {
    headers: headers
  })
  return !!(response && response.data && response.data.success)
}