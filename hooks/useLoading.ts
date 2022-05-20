import { useState } from "react"

export const useLoading = () => {
  const [isLoading, setLoading] = useState(false)

  const onLoad = () => setLoading(true)

  const onDone = () => setLoading(false)

  return { isLoading, onLoad, onDone }
}
