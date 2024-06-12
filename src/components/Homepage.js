import React, { useEffect, useState,useMemo } from 'react';
import Product from './Product';
import Menu from './Menu';
import Cart from './Cart';


const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });


    // const [filteredProducts, setFilteredProducts] = useState([]);
    // useEffect(() => {
    //     const filtered = products.filter(product =>
    //         product.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // let sorted = [...filtered];

    //     if (sortOption === 'asc') {
    //         sorted = sortByPriceAscending(filtered);
    //     } else if (sortOption === 'desc') {
    //         sorted = sortByPriceDescending(filtered);
    //     }
    //     setFilteredProducts(sorted);
    // }, [products, searchTerm, sortOption]);



    const sortByPriceAscending = (products) =>  products.sort((a, b) => a.price - b.price); 
    const sortByPriceDescending = (products) =>  products.sort((a, b) => b.price - a.price);
   

    const filteredProducts = useMemo(() => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOption === 'asc') {
            return sortByPriceAscending(filtered);
        } else if (sortOption === 'desc') {
            return sortByPriceDescending(filtered);
        } else {
            return filtered;
        }
    }, [products, searchTerm, sortOption]);






    const updateCart = (productId, action) => {
        const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
        let updatedCartItems = [...cartItems];
    
        if (existingItemIndex !== -1) {
            const existingItem = updatedCartItems[existingItemIndex];
    
            if (action === 'add') {
                updatedCartItems[existingItemIndex].quantity++;
            } else if (action === 'remove') {
                if (existingItem.quantity > 1) {
                    updatedCartItems[existingItemIndex].quantity--;
                } else {
                    updatedCartItems = updatedCartItems.filter(item => item.productId !== productId);
                }
            }
        } else if (action === 'add') {
            const productToAdd = products.find(product => product.id === productId);
            updatedCartItems.push({ productId: productId, product: productToAdd, quantity: 1 });
        }
    
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };
    
    
  
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(json => {
                console.log(json); 
                setProducts(json); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 

    return (
        <div>

            <Menu 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortOption={sortOption}
                setSortOption={setSortOption}
                cartItems={cartItems}    
            />
            

            <div style={styles.gridContainer}>
                {filteredProducts.map(product => (
                    <Product key={product.id} product={product} updateCart={updateCart} />
                ))}
            </div>

           
            {/* <Cart /> */}

        </div>
    );
};

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
    },
};

export default Homepage;



















