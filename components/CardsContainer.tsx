import React from 'react'
import Card from './Card'

function CardsContainer ({ images, names, ids, isConnected }: any) {
  return (
    <div className='flex flex-wrap flex-row gap-5 w-5/6 md:w-full items-center justify-center'>
      <Card
        id={ids[0]}
        pricing={'100'}
        image={images[0]}
        name={names[0]}
        isConnected={isConnected}
        type='Gold'
      />
      <Card
        id={ids[1]}
        pricing={'25'}
        image={images[1]}
        name={names[1]}
        isConnected={isConnected}
        type='Silver'
      />
      <Card
        id={ids[2]}
        pricing={'1'}
        image={images[2]}
        name={names[2]}
        isConnected={isConnected}
        type='Copper'
      />
    </div>
  )
}

export { CardsContainer }
