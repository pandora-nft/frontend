import { useEffect, useState } from "react"

interface CountdownTimerProps {
  seconds: number
}
export const CountdownTimer = ({ seconds }: CountdownTimerProps) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])

  return (
    <div>
      <h1>Time Left{timeLeft}</h1>
    </div>
  )
}
