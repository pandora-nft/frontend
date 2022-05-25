import { useEffect, useContext } from "react"
import { ErrorAction, ErrorContext } from "context/errors/ErrorContext"

export const useError = () => {
  const { errorState, dispatch } = useContext(ErrorContext)

  const setError = (errMessage: string) => {
    dispatch({ type: ErrorAction.SHOW_ERROR, message: errMessage })
  }

  const clearError = () => {
    dispatch({ type: ErrorAction.HIDE_ERROR })
  }

  useEffect(() => {
    const { message, show } = errorState
    if (message === "" || !show) return

    const timeout = setTimeout(clearError, 3000)

    return () => clearTimeout(timeout)
  }, [errorState])

  return { errorState, setError, clearError }
}
