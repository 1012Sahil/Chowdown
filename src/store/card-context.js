import React from "react";

// we only do this so that we can use VSCODE's auto fill code feature, which requires us to declare 
// what this context might contain
const CartContext = React.createContext({
    items: [],
    totalAmount: +0,
    addItem: item => {},
    removeItem: id => {},
    clearCart: () => {}
});

export default CartContext;
