import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/catalog.module.css';

// Componente para mostrar artículos del catálogo
const CatalogView = () => {
    const items = [
        { id: 1, name: 'Backpack', description: 'Item description 1', points: 100, image: '/Backpack.png' },
        { id: 2, name: 'Baseball Cap', description: 'Item description 2', points: 200, image: '/Baseball cap.png' },
        { id: 3, name: 'Bluetooth Speaker', description: 'Item description 3', points: 300, image: '/Bluetooth Speaker.png' },
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
        // Añade más artículos según sea necesario
    ];

    return (
        <div className={styles.catalogView}>
            {items.map(item => (
                <div key={item.id} className={styles.catalogItem}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                    <div className={styles.itemInfo}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                    <p className={styles.itemPoints}>Points: {item.points}</p>
                    <button className={styles.requestButton}>Request</button>
                </div>
            ))}
        </div>
    );
};

// Componente para mostrar el historial de puntos
const HistoryView = () => {
    const history = [
        { id: 1, date: '2024-01-01', points: 100, description: 'Request Item 1' },
        { id: 2, date: '2024-02-01', points: 200, description: 'Request Item 2' },
        { id: 3, date: '2024-03-01', points: 300, description: 'Request Item 3' },
        { id: 4, date: '2024-01-01', points: 100, description: 'Request Item 4' },
        { id: 5, date: '2024-02-01', points: 200, description: 'Request Item 5' },
        { id: 6, date: '2024-03-01', points: 300, description: 'Request Item 6' },
        { id: 7, date: '2024-01-01', points: 100, description: 'Request Item 7' },
        { id: 8, date: '2024-02-01', points: 200, description: 'Request Item 8' },
        { id: 9, date: '2024-03-01', points: 300, description: 'Request Item 9' },
        // Añade más registros según sea necesario
    ];

    return (
        <div className={styles.historyView}>
            {history.map(entry => (
                <div key={entry.id} className={styles.historyItem}>
                    <p>{entry.date}</p>
                    <p>{entry.description}</p>
                    <p>Points: {entry.points}</p>
                </div>
            ))}
        </div>
    );
};

const Catalog = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [view, setView] = useState('catalog'); // 'catalog' o 'history'
    const [userPoints, setUserPoints] = useState(0); // Estado para los puntos del usuario

    useEffect(() => {
        if (router.query.username) {
            // Función para formatear el username y crear el nombre del usuario
            const formattedUsername = formatUsername(router.query.username);
            setUsername(formattedUsername);

            // Aqui se obtiene los puntos del usuario desde google sheet
            fetchUserPoints(router.query.username);
        }
    }, [router.query.username]);

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

    const formatUsername = (username) => {
        // Dividir el nombre y apellido por el punto
        const parts = username.split('.');
        
        // Poner en mayuscula la primera letra de cada parte y unirlas con un espacio
        const formattedName = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
        
        return formattedName;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.topRight}>
                    {username && (
                        <div className={styles.username}>
                            <p>Welcome, {username}!</p>
                        </div>
                    )}
                    <div className={styles.pointsCounter}>
                        <p>Points:</p>
                        <p><span id="points">{userPoints}</span></p> {/* aqui se muestra los puntos disponibles del usuario */}
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
                <CatalogView username={username} />
            ) : (
                <HistoryView />
            )}
        </div>
    );
};

export default Catalog;
