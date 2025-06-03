import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState(null); // Add currentStudentId to the context

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.dishId === dish.dishId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.dishId === dish.dishId
            ? { ...item, quantity: item.quantity + dish.quantity }
            : item
        );
      }
      return [...prevCart, dish];
    });
  };

  const removeFromCart = (dishId) => {
    console.log("Removing dish with ID:", dishId);
    setCart((prevCart) => prevCart.filter((item) => item.dishId !== dishId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); // Set the cart to an empty array
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart, // Expose the clearCart function
        currentStudentId,
        setCurrentStudentId, // Expose the function to update the student ID
      }}
    >
      {children}
    </CartContext.Provider>
  );
};