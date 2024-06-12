// const Cart = () => {
//     // console.log(localStorage.getItem('cart'))

//     const cartItems = JSON.parse(localStorage.getItem('cart')) || []
//     const totalValue = cartItems.reduce((total, item) => {
//         return total + (item.product.price * item.quantity);
//     }, 0);

//     const truncateTitle = (title, maxLength) => title.length > maxLength ? title.slice(0, maxLength - 3) + '...' : title;


//     // console.log(cartItems)
//     return (
//         <div style={styles.cartContainer}>
//             <h2>Cart</h2>
//             {cartItems.map(item => (
//                 <div key={item.productId} style={styles.cartItem}>
//                     <span>{truncateTitle(item.product.title,15)}</span>
//                     <span>{item.product.price}</span>
//                     <span>Quantity: {item.quantity}</span>
//                     {/* <button onClick={() => removeFromCart(item.productId)}>Remove</button> */}
//                 </div>
//             ))}
//               <div>Total: ${totalValue}</div> 
//         </div>
//     );
// };

// const styles = {
//     cartContainer: {
//         marginTop: '20px',
//         padding: '20px',
//         border: '1px solid #ddd',
//         borderRadius: '5px',
//     },
//     cartItem: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '10px',
//     },
// };

// export default Cart;



// Cart.js
import React from 'react';


const ProductCart = ({ product, quantity }) => {
    const { image, title, price, description, rating } = product;
    const totalPrice = price * quantity;

    return (
        <div style={styles.productCart}>
            <img src={image} alt={title} style={styles.productCartImage} />
            <div style={styles.productCartTitle}>{title}</div>
            <div style={styles.productCartDescription}>{description}</div>
            <div style={styles.productCartRating}>Rating: {rating.rate} <br /> ({rating.count} reviews)</div>
            <div style={styles.productCartPrice}>${price.toFixed(2)}</div>
            <div style={styles.productCartQuantity}>Quantity: {quantity} <br/> Total Price: {totalPrice}</div>
        </div>
    );
};



const Cart = ({  }) => {


    const cartItems = JSON.parse(localStorage.getItem('cart')) || []

    const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div style={styles.cart}>
            <h1 style={styles.cartHeader}>Your Cart</h1>
            {!cartItems.length ? 
            (<p style={styles.cartEmptyMessage}>Your cart is empty.</p>) : 
            (
                <>
                    {cartItems.map((item, index) => (
                        <ProductCart key={index} product={item.product} quantity={item.quantity} />
                    ))}
                    <div style={styles.cartTotal}><br/><br/>Total Amount: ${totalAmount.toFixed(2)} <br/><br/>
                    <button style={styles.checkoutButton}> Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};



const styles = {
    cart: {
        padding: '20px',
    },
    cartHeader: {
        fontSize: '2em',
        marginBottom: '20px',
    },
    cartEmptyMessage: {
        fontSize: '1.2em',
    },
    cartTotal: {
        fontSize: '1.5em',
        marginTop: '20px',
        fontWeight: 'bold',
        borderTop: '2px solid #ddd',
        paddingTop: '10px',
    },
    productCart: {
        display: 'grid',
        gridTemplateColumns: '100px 1fr 2fr 1fr 1fr 1fr',
        alignItems: 'center',
        marginBottom: '20px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
        gap: '10px',
    },
    productCartImage: {
        width: '100%',
    },
    productCartTitle: {
        fontSize: '1.2em',
        marginBottom: '10px',
    },
    productCartDescription: {
        marginBottom: '10px',
    },
    productCartRating: {
        marginBottom: '10px',
    },
    productCartPrice: {
        marginBottom: '10px',
    },
    productCartQuantity: {
        marginBottom: '10px',
    },
    checkoutButton: {
        padding: '10px 10px',
        fontSize: '0.7em',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
    productCartTotal: {
        marginBottom: '10px',
    }
};

export default Cart;

