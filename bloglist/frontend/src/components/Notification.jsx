import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, notificationType }) => {
  if (message === '') {
    return null
  }

  return (
    <Alert
      variant={notificationType === 'success' ? 'success' : 'danger'}
      className='fixed-top'
    >
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  notificationType: PropTypes.string,
}
export default Notification
