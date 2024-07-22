import React, { useState, useEffect } from 'react';
import styles from '../styles/catalog.module.css';

const Catalog = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [view, setView] = useState('catalog');
    const [userPoints, setUserPoints] = useState(0);
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessages, setSuccessMessages] = useState({});
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const user = urlParams.get('username');
        if (user) {
            setUsername(user);
            const formattedName = formatUsername(user);
            setName(formattedName);
            fetchUserPoints(user);
            fetchUserHistory(user);
        }
    }, []);

    const fetchUserPoints = async (username) => {
        try {
            const response = await fetch('/api/points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch points');
            }

            const data = await response.json();
            if (data.success) {
                setUserPoints(data.points);
            } else {
                console.error('Error fetching points:', data.message);
            }
        } catch (error) {
            console.error('Error fetching points:', error);
        }
    };

    const fetchUserHistory = async (username) => {
        try {
            const response = await fetch('/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch history');
            }

            const data = await response.json();
            if (data.success) {
                setHistory(data.history);
            } else {
                console.error('Error fetching history:', data.message);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const formatUsername = (username) => {
        const parts = username.split('.');
        return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    };

    const handleRequest = async (itemPoints, itemName) => {
        if (userPoints >= itemPoints) {
            const newPoints = userPoints - itemPoints;
            setUserPoints(newPoints);
            try {
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, newPoints, itemPoints, itemName }),
                });
                const data = await response.json();
                if (!data.success) {
                    console.error('Error updating points:', data.message);
                } else {
                    console.log('Item purchased and order saved');
                }
            } catch (error) {
                console.error('Error updating points:', error);
            }
        } else {
            setErrorMessages(prev => ({ ...prev, [itemId]: 'Insufficient points' }));
            setTimeout(() => {
                setErrorMessages(prev => ({ ...prev, [itemId]: '' }));
            }, 1000);
        }
    };

    const items = [
        { id: 1, name: 'Backpack', description: 'Item description 1', points: 3000, image: '/Backpack.png' },
        { id: 2, name: 'Baseball Cap', description: 'Item description 2', points: 200, image: '/Baseball cap.png' },
        { id: 3, name: 'Bluetooth Speaker', description: 'Item description 3', points: 4000, image: '/Bluetooth Speaker.png' },
        { id: 4, name: 'Cooler', description: 'Item description 4', points: 100, image: '/Cooler.png' },
        { id: 5, name: 'Cotton Socks', description: 'Item description 5', points: 200, image: '/Cotton Socks.png' },
        { id: 6, name: 'Dry Sack Backpack', description: 'Item description 6', points: 300, image: '/Dry Sack Backpack.png' },
        { id: 7, name: 'Dual Folding Cellphone Stand', description: 'Item description 7', points: 100, image: '/Dual Folding Cell Phone Stand.png' },
        { id: 8, name: 'Fanny Pack', description: 'Item description 8', points: 200, image: '/Fanny Pack.png' },
        { id: 9, name: 'Fast Charging Portable Phone Power Bank', description: 'Item description 9', points: 300, image: '/Fast Charging Portable Phone Power Bank.png' },
        { id: 10, name: 'Insulated Mugs', description: 'Item description 10', points: 100, image: '/Insulated Mugs.png' },
        { id: 11, name: 'Jacket', description: 'Item description 11', points: 200, image: '/Jacket.png' },
        { id: 12, name: 'Portable Fan', description: 'Item description 12', points: 300, image: '/Portable Fan.png' },
        { id: 13, name: 'Travel Mug', description: 'Item description 13', points: 100, image: '/Travel Mug.png' },
    ];

    const handleButtonClick = (itemId, itemPoints, itemName) => {
        if (userPoints >= itemPoints) {
            setErrorMessages(prev => ({ ...prev, [itemId]: '' })); // Clear error message
            handleRequest(itemPoints, itemName);
            // Show success message
            setSuccessMessages(prev => ({ ...prev, [itemId]: 'Item purchased!' }));

            // Clear success message after 2 seconds
            setTimeout(() => {
                setSuccessMessages(prev => ({ ...prev, [itemId]: '' }));
            }, 2000);
        } else {
            setErrorMessages(prev => ({ ...prev, [itemId]: 'Insufficient points' }));
            setTimeout(() => {
                setErrorMessages(prev => ({ ...prev, [itemId]: '' }));
            }, 1000);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.topRight}>
                    {name && (
                        <div className={styles.username}>
                            <p>Welcome, {name}!</p>
                        </div>
                    )}
                    <div className={styles.pointsCounter}>
                        <p>Points:</p>
                        <p><span id="points">{userPoints}</span></p>
                    </div>
                </div>
                <div className={styles.anuncio}>
                    <div className={styles.texto}>Catalogue</div>
                </div>
                <div className={styles.btnContainer}>
                    <a href="/" className={styles.goBackBtn}>Go back</a>
                </div>
                <div className={styles.viewSwitcher}>
                    <button
                        onClick={() => setView('catalog')}
                        className={view === 'catalog' ? styles.active : ''}
                    >
                        Store
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className={view === 'history' ? styles.active : ''}
                    >
                        History
                    </button>
                </div>
            </div>

            {view === 'catalog' ? (
                <div className={styles.catalogView}>
                    {items.map(item => (
                        <div key={item.id} className={styles.catalogItem}>
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <p className={styles.itemDescription}>{item.description}</p>
                            </div>
                            <p className={styles.itemPoints}>Points: {item.points}</p>
                            <button
                                className={styles.requestButton}
                                onClick={() => handleButtonClick(item.id, item.points, item.name)}
                            >
                                Request
                            </button>
                            {errorMessages[item.id] && (
                                <p className={styles.errorMessage}>{errorMessages[item.id]}</p>
                            )}
                            {successMessages[item.id] && (
                                <p className={styles.successMessage}>{successMessages[item.id]}</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.historyView}>
                    <h2>History View</h2>
                    {history.length > 0 ? (
                        <ul>
                            {history.map((entry, index) => (
                                <li key={index}>
                                    <p>Item: {entry.itemName}</p>
                                    <p>Points Spent: {entry.itemPoints}</p>
                                    <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No history available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Catalog;
