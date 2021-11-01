export const addItemToCart = (cartItems,item) => {
    const existingItem = cartItems.find(cartitem => cartitem.id===item.id);
    if(existingItem){
        return cartItems.map((carti) => carti.id === item.id ?{
            ...carti,
            quantity: carti.quantity+1,
            totalPrice:(carti.quantity+1)*carti.price,
            SGST: (Number)((((carti.quantity+1)*carti.price)*((carti.tax/100)/2)).toFixed(2)),
            CGST : (Number)((((carti.quantity+1)*carti.price)*((carti.tax/100)/2)).toFixed(2)),
        } : carti)
    }
    return [...cartItems, {...item,quantity:1,tax:6, totalPrice:(Number)((item.price).toFixed(2)), CGST: (Number)(((item.price)*(0.06/2)).toFixed(2)),SGST:(Number)(((item.price)*(0.06/2)).toFixed(2))}]
}

export const removeItemfromCart = (cartItems,item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if(existingItem.quantity===1){
        return cartItems.filter((cartitem) => cartitem.id!==item.id)
    }
    return cartItems.map((cartitem) => cartitem.id === item.id ?
     {
         ...cartitem,
         quantity:cartitem.quantity-1,
         totalPrice:(cartitem.quantity-1)*cartitem.price,
         SGST: (Number)((((cartitem.quantity-1)*cartitem.price)*((cartitem.tax/100)/2)).toFixed(2)),
         CGST : (Number)((((cartitem.quantity-1)*cartitem.price)*((cartitem.tax/100)/2)).toFixed(2)),
     }: cartitem);
}

export const changetaxCart = (cartItems,carttax) => {
    const existingItem = cartItems.find(cartItem => cartItem.id===carttax.item.id);
    if(existingItem){
        return cartItems.map((cartItem) => cartItem.id === carttax.item.id ?{
            ...cartItem,
            tax: carttax.tax,
            SGST: (Number)((((cartItem.quantity)*cartItem.price)*((carttax.tax/100)/2)).toFixed(2)),
            CGST : (Number)((((cartItem.quantity)*cartItem.price)*((carttax.tax/100)/2)).toFixed(2)),
        } : cartItem)
    }
    return [...cartItems]
}