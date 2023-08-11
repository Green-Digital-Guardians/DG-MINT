import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  AvatarComponent,
  lightTheme
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ToastContainer } from 'react-toastify'
import celoLogo from '../public/images/celo-logo.svg'
import '@celo/react-celo/lib/styles.css'
import 'react-toastify/dist/ReactToastify.css'
// Import known recommended wallets
import { Valora } from '@celo/rainbowkit-celo/wallets'
import {
  metaMaskWallet,
  omniWallet,
  ledgerWallet,
  coinbaseWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'

// Import CELO chain information
// import { celo, celoAlfajores } from 'viem/chains'
import { Alfajores, Celo } from '@celo/rainbowkit-celo/chains'
import useDeviceType from '../hooks/useDevice'
import { CeloProvider, SupportedProviders } from '@celo/react-celo'
import { WalletConnectConnector } from 'wagmi/dist/connectors/walletConnect'
import Image from 'next/image'

const projectId = '7e527e8d641d036dca61031d4bb8b5bc'

function MyApp ({ Component, pageProps }: any) {
  const isDesktop = useDeviceType()
  const { chains, publicClient } = configureChains(
    [Alfajores],
    [
      jsonRpcProvider({
        rpc: chain => ({ http: chain.rpcUrls.default.http[0] })
      })
    ]
  )

  const { wallets } = getDefaultWallets({
    appName: 'DGG Mint',
    projectId,
    chains
  })

  const availableWallets = isDesktop
    ? [
        metaMaskWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
        coinbaseWallet({ appName: 'DGG Mint', chains }),
        walletConnectWallet({ projectId, chains })
      ]
    : [
        Valora({ projectId, chains }),
        coinbaseWallet({ appName: 'DGG Mint', chains }),
        metaMaskWallet({ projectId, chains })
      ]
  const connectors = connectorsForWallets([
    // ...wallets,
    {
      groupName: 'Supports Celo',
      wallets: [...availableWallets]
    }
  ])

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient: publicClient
  })

  const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    const color = 'transparent'
    return (
      <Image
        src={celoLogo}
        width={size}
        height={size}
        alt='Celo Logo'
        style={{ borderRadius: 999 }}
      />
    )
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: '#4C8030'
        })}
        avatar={CustomAvatar}
        appInfo={{
          appName: 'DG guardias MINT',
          learnMoreUrl: 'https://dgguardians.com/'
        }}
        coolMode
        chains={chains}
      >
        <ToastContainer />
        <CeloProvider
          dapp={{
            icon: 'https://example.com/icon.png',
            name: 'My awesome dApp',
            description: 'My awesome description',
            url: 'https://example.com',
            // if you plan on supporting WalletConnect compatible wallets, you need to provide a project ID, you can find it here: https://docs.walletconnect.com/2.0/cloud/relay
            walletConnectProjectId: projectId
          }}
          connectModal={{
            providersOptions: {
              // This option hides specific wallets from the default list
              // hideFromDefaults: [SupportedProviders.CeloExtensionWallet],

              hideFromDefaults: [
                SupportedProviders.MetaMask,
                SupportedProviders.PrivateKey,
                SupportedProviders.Ledger,
                SupportedProviders.Omni,
                SupportedProviders.CeloDance,
                SupportedProviders.CoinbaseWallet,
                SupportedProviders.Injected,
                SupportedProviders.WalletConnect
              ],
              searchable: false
            }
          }}
        >
          <Component {...pageProps} />
        </CeloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
