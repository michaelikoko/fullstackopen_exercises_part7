import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      message: action.payload.message,
      type: action.payload.type,
    }
  case 'CLEAR_NOTIFICATION':
    return {
      message: '',
      type: '',
    }
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    type: '',
  })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export  default NotificationContext