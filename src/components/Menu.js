import React, { useState } from 'react';

// import ModalCart from './ModalCart';
import { useNavigate } from 'react-router-dom';

const Menu = ({ searchTerm, setSearchTerm, sortOption, setSortOption }) => {

    const navigate = useNavigate();


    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

   
    return (
        <div style={styles.menuContainer}>
            <input
                type="text"
                placeholder="Type here to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={styles.sortSelect}>

                <option value="">Sort by Price</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <button style={styles.cartButton} onClick={() =>navigate('/cart')}> Cart </button>
        </div>
    );
};

const styles = {
    menuContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        marginBottom: '20px'
    },
    searchInput: {
        marginLeft: '50px',
        padding: '10px',
        fontSize: '16px',
        width : '50%',
        marginRight: '50px'
    },
    sortSelect: {
        marginRight: '50px',
        padding: '10px',
        width : '25%',
        fontSize: '16px'
    },
    cartButton: {
        padding: '10px',
        marginRight: '50px',
        fontSize: '16px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width : '25%'
    }
};

export default Menu;
