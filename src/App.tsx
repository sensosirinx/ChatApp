import React, { useEffect }  from 'react'
import Chat from './components/Chat'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useActions } from './hooks/useActions'


function App () {

  const { token, error } = useTypedSelector(state => state.token)
  const { requestToken } = useActions()

  useEffect(() => {
    requestToken()
  }, [])

  if (error) {
    return <div className="error">
      {error}
    </div>
  }

	return (
    <>
      {token ? <Chat /> : ''}
    </>
	)
}

export default App
