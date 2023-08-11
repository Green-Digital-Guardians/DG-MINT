import { useEffect, useState } from 'react'

const useDeviceType = () => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    console.debug(
      userAgent,
      /mobile|android|iphone|ipad|iemobile/i.test(userAgent)
    )

    const checkIsDesktop = () => {
      return !/mobile|android|iphone|ipad|iemobile/i.test(userAgent)
    }

    setIsDesktop(checkIsDesktop())
  }, [])

  return isDesktop
}

export default useDeviceType
