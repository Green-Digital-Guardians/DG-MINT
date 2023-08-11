import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import useMint from '../hooks/useMint'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { useCelo } from '@celo/react-celo'
import useDeviceType from '../hooks/useDevice'
import { Spinner } from 'flowbite-react'

export default function Card ({
  image,
  name,
  isConnected,
  type,
  id,
  pricing
}: any) {
  const {
    approve,
    mintCelo,
    mintError,
    mintErrorData,
    approveErrorData,
    approvalError,
    data,
    refetch,
    approveLoad,
    approved,
    mint,
    minted,
    mintLoad,
    setid,
    actualId,
    setPrice
  } = useMint()

  const [isTransaction, setIsTransaction] = useState(false)
  const [txnStatus, setTxnStatus] = useState({
    error: false,
    approved: false,
    minted: false
  })
  const [isMounted, setIsMounted] = useState(false)
  const { address: rainbow } = useAccount()
  const { address: celo } = useCelo()
  const isDesktop = useDeviceType()
  const [mintTrigger, setMintTrigger] = useState(false)

  const [count, setCount] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1) // You want to increment the counter every second...
    }, 1000)
    if (mintTrigger) {
      console.debug(data)
      refetch()
    }
    return () => clearInterval(intervalId)
  }, [count])

  const handleOnModalClick = async () => {
    if (rainbow) {
      if (minted) {
        setIsTransaction(false)
        toast.success('NFT mint succesful', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          onClose: () => window.location.reload(),
          draggable: true,
          toastId: 'success'
        })
      } else {
        if (BigInt(pricing * 10 ** 18) <= (data as bigint)) {
          console.debug('minting')
          mint?.()
          setTxnStatus({ ...txnStatus, approved: true, minted: true })
        } else {
          console.debug('refetching')
          setMintTrigger(true)
        }
      }
    } else if (celo) {
    }
  }

  useEffect(() => {
    if (mintTrigger && !mintLoad && !minted && txnStatus.minted === false) {
      console.debug('minting1')
      if (BigInt(pricing * 10 ** 18) <= (data as bigint)) {
        setTxnStatus({ ...txnStatus, approved: true, minted: true })
        setMintTrigger(false)
        console.debug('minting2')
        mint?.()
      }
    }
  }, [data])

  const handleOnClick = () => {
    setid(id)
    setPrice(BigInt(pricing * 10 ** 18))
    setIsTransaction(true)
    console.debug(
      data,
      rainbow,
      BigInt(pricing * 10 ** 18) > (data as bigint),
      BigInt(pricing * 10 ** 18),
      approve
    )
  }

  async function mintWitCelo () {
    if (txnStatus.minted === true) return null
    setTxnStatus({ ...txnStatus, approved: true, minted: true })
    try {
      await mintCelo()
      setIsTransaction(false)
    } catch (e) {
      console.error(e)
      setIsTransaction(false)
      toast.error('Something went wrong, please try again later', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        onClose: () => window.location.reload(),
        draggable: true,
        toastId: 'error'
      })
    }
  }

  useEffect(() => {
    if (mintTrigger) return
    if (rainbow && actualId !== 0 && typeof data !== undefined) {
      if (BigInt(pricing * 10 ** 18) > (data as bigint)) {
        refetch()
        if (
          !approved &&
          approve &&
          !approveLoad &&
          txnStatus.approved === false
        ) {
          approve?.()
          setTxnStatus({ ...txnStatus, approved: true })
        }
      } else if (!minted && mint && !mintLoad && txnStatus.minted === false) {
        mint?.()
        setTxnStatus({ ...txnStatus, approved: true, minted: true })
      }
    } else if (
      celo &&
      actualId !== 0 &&
      typeof data !== undefined &&
      txnStatus.minted === false
    ) {
      mintWitCelo()
    }
  }, [rainbow, actualId, data, approved, approveLoad, minted, mintLoad, mint])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    console.debug(mintError, approvalError)
    if (mintError || approvalError) {
      console.error(mintError || approvalError)
      // alert(mintErrorData || approveErrorData)
      toast.error('Something went wrong, please try again later', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        onClose: () => window.location.reload(),
        draggable: true,
        toastId: 'error'
      })
    }
    setIsTransaction(false)
  }, [mintError, approvalError])

  useEffect(() => {
    console.debug(txnStatus, approved, approveLoad)
  }, [approved, approveLoad])

  return (
    <>
      <AnimatePresence>
        {isTransaction && isMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed z-50 top-0 left-0 bg-black bg-opacity-5 right-0 bottom-0 flex justify-center items-center'
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className=' py-5 px-2 shadow-sm bg-slate-50 backdrop-blur-xl bg-opacity-30 w-11/12 md:w-auto md:px-10 md:py-5 rounded-lg flex flex-col gap-5 justify-center items-center'
            >
              <h1 className='font-bold text-center text-[#4C8030] text-xl md:text-2xl'>
                {celo
                  ? 'Approve transaction'
                  : txnStatus.minted && minted
                  ? 'Succesful transaction'
                  : txnStatus.approved && approved
                  ? 'Mint NFT'
                  : 'Aprove transaction'}
              </h1>
              <Spinner size={'xl'} color={'info'} className='md:h-32 md:w-32' />
              {celo ? null : approved || txnStatus.minted ? (
                <button
                  disabled={
                    (txnStatus.minted && mintLoad) ||
                    (txnStatus.approved && approveLoad) ||
                    mintTrigger
                  }
                  className={` ${
                    ((txnStatus.minted && mintLoad) ||
                      (txnStatus.approved && approveLoad) ||
                      mintTrigger) &&
                    'bg-[#4c803027] hover:bg-[#4c803027]'
                  } bg-[#4C8030] text-white font-bold w-11/12 rounded-md hover:bg-[#4c8030c7] py-2`}
                  onClick={handleOnModalClick}
                >
                  {txnStatus.minted ? 'Close' : 'Mint'}
                </button>
              ) : (
                <p className='font-bold text-gray-500'>
                  It won&apos;t take too long
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='relative w-auto bg-black bg-opacity-5  backdrop-blur-md rounded-md  shadow-lg p-5'>
        {/* <span className='z-[200] flex items-center justify-center font-bold text-white text-2xl absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-gray-400 opacity-80'>
        <h1>Comming soon!</h1>
      </span> */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className='relative'
        >
          <Image
            loading='lazy'
            className='rounded-md shadow-md aspect-square'
            alt='wonderfull NFT'
            width={256}
            height={256}
            src={image}
          />
          <p className='absolute bottom-0 left-0 text-white backdrop-blur-md py-2 px-8  before:content-["CUsd"] before:font-bold before:pr-2'>
            {pricing}
          </p>
        </motion.span>
        <span>
          <p
            className={`absolute top-0 w-3/6 rounded-tl-lg  left-0 py-2 px-5 opacity-90  text-center  text-white ${
              type === 'Gold'
                ? 'bg-[#C7A44C]'
                : type === 'Silver'
                ? 'bg-[#999EA3]'
                : 'bg-[#D09D51]'
            }  font-bold`}
          >
            {type}
          </p>
        </span>
        <div className='py-2 flex flex-col gap-2'>
          <h1 className='text-lg font-bold text-start'>{name}</h1>
          {isConnected && isMounted ? (
            <button
              disabled={approveLoad || mintLoad}
              onClick={handleOnClick}
              className={`${
                approveLoad || mintLoad ? 'bg-[#4c8030b7]' : 'bg-[#4C8030]'
              } font-bold w-full text-white py-2 rounded-md hover:bg-[#70bd46] transition-all duration-200 ease-in-out`}
            >
              Mint!
            </button>
          ) : (
            <span>
              <h2 className='bg-[#3f5f2eb7] text-center font-bold w-full text-white py-2 px-2 rounded-md'>
                Connect your wallet
              </h2>
            </span>
          )}
        </div>
      </div>
    </>
  )
}
