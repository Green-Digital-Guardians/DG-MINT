import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactDOM from 'react-dom'

function Modal ({ children }: any) {
  if (typeof window === 'object') {
    return ReactDOM.createPortal(
        <div className='modal'>
          <motion.div
            initial={{
              y: 100
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: 100
            }}
            className=' h-60 w-60  p-10 flex flex-col gap-5 justify-center items-center rounded-md bg-slate-50 z-50 fixed  '
          >
            {children}
          </motion.div>
        </div>
      ,
      document.body
    )
  }
  return <></>
}

export default Modal
