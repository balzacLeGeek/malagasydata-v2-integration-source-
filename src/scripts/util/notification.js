import Notification from 'ant-design-vue/lib/notification'

export default function notification({ type, message, description }) {
  Notification[type]({
    message,
    description,
  })
}

export function notificationError(description, placement = 'topRight') {
  Notification['error']({
    type: 'error',
    message: 'Message',
    description,
    placement,
  })
}

export function notificationSuccess(description, placement = 'topRight') {
  Notification['success']({
    type: 'success',
    message: 'Message',
    description,
    placement,
  })
}
