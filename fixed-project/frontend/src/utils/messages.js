import { toast } from 'react-toastify'

export function success(msg) {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  })
}

export function error(msg) {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  })
}

export function info(msg) {
  toast.info(msg, {
    position: 'top-right',
    autoClose: 4000,
    theme: 'colored',
  })
}
