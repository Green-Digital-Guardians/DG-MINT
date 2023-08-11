export function convertWeb3Address (address: string) {
    if (!address.startsWith('0x')) throw new Error('Invalid address format')
    return `0x${address.slice(2, 6)}...${address.slice(-4)}`
  }
  