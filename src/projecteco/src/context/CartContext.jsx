import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  
  const [cartTotal, setCartTotal] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Calculate cart totals
    let total = 0
    let count = 0
    let totalDiscount = 0
    
    cart.forEach(item => {
      const price = item.price
      const discountAmount = (price * (item.discount / 100)) * item.quantity
      total += price * item.quantity
      count += item.quantity
      totalDiscount += discountAmount
    })
    
    setCartTotal(total)
    setCartCount(count)
    setDiscount(totalDiscount)
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item._id === product._id)
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    
    setCart(prevCart => {
      return prevCart.map(item => 
        item._id === productId 
          ? { ...item, quantity } 
          : item
      )
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      cartCount,
      discount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      finalTotal: cartTotal - discount
    }}>
      {children}
    </CartContext.Provider>
  )
}