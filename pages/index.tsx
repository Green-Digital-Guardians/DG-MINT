import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import NFT_Air_Black from '../public/images/Air-Gold.webp'
import NFT_Air_Green from '../public/images/Air-Silver.webp'
import NFT_Air_White from '../public/images/Air-Copper.webp'
import NFT_Earth_Black from '../public/images/Earth-Gold.webp'
import NFT_Earth_Green from '../public/images/Earth-Silver.webp'
import NFT_Earth_White from '../public/images/Earth-Copper.webp'
import NFT_Fire_Black from '../public/images/Fire-Gold.webp'
import NFT_Fire_Green from '../public/images/Fire-Silver.webp'
import NFT_Fire_White from '../public/images/Fire-Copper.webp'
import NFT_Water_Black from '../public/images/Water-Gold.webp'
import NFT_Water_Green from '../public/images/Water-Silver.webp'
import NFT_Water_White from '../public/images/Water-Copper.webp'
import NFT_Space_Green from '../public/images/Space-Silver.webp'
import NFT_Space_White from '../public/images/Space-Copper.webp'
import NFT_Space_Black from '../public/images/Space-Gold.webp'
import NFT_Metal_White from '../public/images/Metal-Copper.webp'
import NFT_Metal_Green from '../public/images/Metal-Silver.webp'
import NFT_Metal_Black from '../public/images/Metal-Gold.webp'
import { CardsContainer } from '../components/CardsContainer'
import { useCelo } from '@celo/react-celo'
import useDeviceType from '../hooks/useDevice'
import ButtonContainer from '../components/ButtonContainer'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import { AnimatePresence } from 'framer-motion'
import { convertWeb3Address } from '../functions/formatAddress'
import { FiLogOut } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import banner from '../public/images/LazyBanner.webp'
import Logo from '../public/favicon.ico'
import Discord from '../public/images/Discord.png'
import Twitter from '../public/images/Twitter.png'
import Instagram from '../public/images/Instagram.png'
import Telegram from '../public/images/Telegram.png'
import Linkedin from '../public/images/LinkedIn.png'
import Youtube from '../public/images/Youtube.png'
import Link from 'next/link'

const Home: NextPage = () => {
  const isDesktop = useDeviceType()
  const [openModal, setopenModal] = useState(false)
  const { address: rainbowAddress } = useAccount()

  const { connect, disconnect, address } = useCelo()
  const handleOnDisconnect = () => {
    disconnect()
    setopenModal(false)
  }

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Función para cargar el video cuando la página esté completamente cargada
    const loadVideo = () => {
      const videoElement = videoRef.current
      if (videoElement) {
        videoElement.src = '/videos/video.mp4'
        videoElement.autoplay = true
        videoElement.muted = true
        videoElement.loop = true
        videoElement.preload = 'auto'
      }
    }

    // Evento window.onload para asegurarse de que la página esté completamente cargada
    window.onload = loadVideo

    // Opcional: Detener el evento window.onload cuando el componente se desmonte
    return () => {
      window.onload = null
    }
  }, [])
  return (
    <section className={`${styles.container}   h-full`}>
      {openModal && (
        <AnimatePresence>
          <Modal>
            <div
              className='absolute top-2 right-2 text-lg font-bold text-slate-900 cursor-pointer'
              onClick={() => setopenModal(false)}
            >
              <IoClose />
            </div>
            <div className=' flex justify-center items-center bg-blue-300 rounded-full '>
              <p className='p-2 flex justify-center items-center pb-4 text-4xl'>
                🐒
              </p>
            </div>
            <h1 className='text-black font-bold text-lg'>
              {convertWeb3Address(address as string)}
            </h1>
            <button
              className='text-slate-900 bg-white px-6 font-bold flex flex-col gap-2 justify-center items-center shadow-md rounded-lg p-2'
              onClick={handleOnDisconnect}
            >
              <FiLogOut />
              <p>Disconnect</p>
            </button>
          </Modal>
        </AnimatePresence>
      )}
      <div className='flex relative flex-col gap-2  py-4 justify-center items-center bg-black '>
        <div className='flex flex-row justify-center px-10 w-full items-center'>
          <Image
            src={Logo}
            alt='icon'
            className='hidden md:inline-block absolute left-2 xl:left-10'
            height={86}
          />
          <div className='flex flex-col items-center gap-2'>
            <h1 className={'text-white text-center font-bold text-2xl'}>
              Welcome to{' '}
              <span className='text-[#4C8030] font-bold'>
                Green Digital Guardians
              </span>
            </h1>
            <ButtonContainer
              connect={connect}
              disconnect={disconnect}
              CeloAddress={address}
              RainbowAddress={rainbowAddress}
              isDesktop={isDesktop}
              setopenModal={setopenModal}
            />
          </div>
          <div className='lg:flex flex-row absolute hidden right-2 xl:right-10 justify-center   items-center gap-5'>
            <Link
              rel='stylesheet'
              target='_blank'
              href='https://twitter.com/dg_guardians'
            >
              <Image src={Twitter} alt='icon' height={28} />
            </Link>
            <Link
              rel='stylesheet'
              target='_blank'
              href='https://www.instagram.com/dg_guardians/'
            >
              <Image src={Instagram} alt='icon' height={28} />
            </Link>
            <Link
              rel='stylesheet'
              target='_blank'
              href='https://www.linkedin.com/company/dg-guardians/'
            >
              <Image src={Linkedin} alt='icon' height={28} />
            </Link>
            <Link
              rel='stylesheet'
              target='_blank'
              href='https://www.youtube.com/@dgguardians'
            >
              <Image src={Youtube} alt='icon' height={28} />
            </Link>
            <Link
              rel='stylesheet'
              target='_blank'
              href='https://t.me/dg_guardians'
            >
              <Image src={Telegram} alt='icon' height={28} />
            </Link>
            <Link
              rel='stylesheet'
              target='_blank'
              href='https://discord.gg/srfUUPfgXH'
            >
              <Image src={Discord} alt='icon' height={28} />
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full bannerLazy h-[70vh] shadow-lg '>
        {isDesktop ? (
          <video
            ref={videoRef}
            className='h-full w-screen object-cover transition-opacity'
          />
        ) : (
          <Image
            className='w-full object-cover h-full'
            src={banner}
            alt='banner'
          />
        )}
      </div>
      <div
        className='relative bg-black w-full overflow-hidden 
        h-7'
      >
        <p className={` absolute animate text-lg flex-nowrap text-white`}>
          This collection is cooming soon!
        </p>
      </div>
      <div className='w-full h-[20vh] bg-slate-50 absolute' />
      <main className={`${styles.main} bgmain`}>
        {/* <p className={styles.description}>Click to get a fabolous NFT!</p> */}
        <div className='flex flex-wrap   flex-row w-full  justify-center items-center gap-4 m-10'>
          <CardsContainer
            isConnected={rainbowAddress || address}
            ids={[3, 9, 15]}
            names={['Water', 'Water', 'Water']}
            images={[NFT_Water_Black, NFT_Water_Green, NFT_Water_White]}
          />
          <CardsContainer
            isConnected={rainbowAddress || address}
            ids={[1, 7, 13]}
            names={['Earth', 'Earth', 'Earth']}
            images={[NFT_Earth_Black, NFT_Earth_Green, NFT_Earth_White]}
          />
          <CardsContainer
            isConnected={rainbowAddress || address}
            ids={[2, 8, 14]}
            names={['Air', 'Air', 'Air']}
            images={[NFT_Air_Black, NFT_Air_Green, NFT_Air_White]}
          />

          <CardsContainer
            isConnected={rainbowAddress || address}
            ids={[4, 10, 16]}
            names={['Fire', 'Fire', 'Fire']}
            images={[NFT_Fire_Black, NFT_Fire_Green, NFT_Fire_White]}
          />
          <CardsContainer
            isConnected={rainbowAddress || address}
            ids={[5, 11, 17]}
            names={['Metal', 'Metal', 'Metal']}
            images={[NFT_Metal_Black, NFT_Metal_Green, NFT_Metal_White]}
          />
          <CardsContainer
            isConnected={rainbowAddress || address}
            ids={[6, 12, 18]}
            names={['Space', 'Space', 'Space']}
            images={[NFT_Space_Black, NFT_Space_Green, NFT_Space_White]}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <a href='https://dgguardians.com/' rel='DG Guardians' target='_blank'>
          Made with 💚 by Green Digital Guardians Team 🌱
        </a>
      </footer>
    </section>
  )
}

export default Home
