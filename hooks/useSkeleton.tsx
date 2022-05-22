export const useSkeleton = () => {
  const showSkeleton = (component: JSX.Element) => {
    return (
      <>
        {Array(12)
          .fill(null)
          .map((_, index) => {
            return <div key={index}>{component}</div>
          })}
      </>
    )
  }

  return { showSkeleton }
}
