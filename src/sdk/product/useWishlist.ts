/* eslint-disable no-console */
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCheckFavoriteProducts = (
  id: string | undefined,
  productId: string
) => {
  const [isInwishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `https://decathlonstore.myvtex.com/api/dataentities/LP/documents/${id}?_fields=id,lists`
      )

      const wishlist = JSON.parse(data.lists)

      if (wishlist.some((item: any) => item.id.toString() === productId)) {
        setIsInWishlist(true)
      }
    })()
  }, [id, productId])

  return isInwishlist
}

const removeFromWishlist = async (id: string, productId: string) => {
  ;(async () => {
    const { data } = await axios.get(
      `https://decathlonstore.myvtex.com/api/dataentities/LP/documents/${id}?_fields=id,lists`
    )

    let lists = JSON.parse(data.lists)

    lists = lists.filter((obj: any) => obj.id.toString() !== productId)

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    ;(async () => {
      await axios.patch(
        'https://decathlonstore.myvtex.com/api/dataentities/LP/documents',
        {
          id,
          lists: JSON.stringify(lists),
        },
        options
      )
    })()
  })()

  return 1
}

const addToWishlist = async (id: string, productId: string, selle: number) => {
  ;(async () => {
    const { data } = await axios.get(
      `https://decathlonstore.myvtex.com/api/dataentities/LP/documents/${id}?_fields=id,lists`
    )

    const lists = JSON.parse(data.lists)

    lists.push({
      id: Number(productId),
      quantity: 1,
      seller: Number(selle),
    })

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    ;(async () => {
      await axios.patch(
        'https://decathlonstore.myvtex.com/api/dataentities/LP/documents',
        {
          id,
          lists: JSON.stringify(lists),
        },
        options
      )
    })()
  })()

  return 1
}

export const toggleWishList = (
  id: string,
  productId: string,
  selle: number,
  e: any
) => {
  if (e.target.classList.contains('favorite-button-fill')) {
    e.target.classList.remove('favorite-button-fill')
    removeFromWishlist(id, productId)
  } else {
    e.target.classList.add('favorite-button-fill')
    addToWishlist(id, productId, selle)
  }
}
