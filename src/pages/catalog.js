import React, { useState } from 'react';
import styles from '../styles/catalog.module.css';

// Componente para mostrar artículos del catálogo
const CatalogView = () => {
    const items = [
        { id: 1, name: 'Item 1', description: 'Item description 1', points: 100, image: '/lapulpe.png' },
        { id: 2, name: 'Item 2', description: 'Item description 2', points: 200, image: '/lapulpe.png' },
        { id: 3, name: 'Item 3', description: 'Item description 3', points: 300, image: '/lapulpe.png' },
        { id: 4, name: 'Item 4', description: 'Item description 4', points: 100, image: '/lapulpe.png' },
        { id: 5, name: 'Item 5', description: 'Item description 5', points: 200, image: '/lapulpe.png' },
        { id: 6, name: 'Item 6', description: 'Item description 6', points: 300, image: '/lapulpe.png' },
        { id: 7, name: 'Item 7', description: 'Item description 7', points: 100, image: '/lapulpe.png' },
        { id: 8, name: 'Item 8', description: 'Item description 8', points: 200, image: '/lapulpe.png' },
        { id: 9, name: 'Item 9', description: 'Item description 9', points: 300, image: '/lapulpe.png' },
        { id: 10, name: 'Item 10', description: 'Item description 10', points: 100, image: '/lapulpe.png' },
        { id: 11, name: 'Item 11', description: 'Item description 11', points: 200, image: '/lapulpe.png' },
        { id: 12, name: 'Item 12', description: 'Item description 12', points: 300, image: '/lapulpe.png' },
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

// Componente principal del catálogo
const Catalog = () => {
    const [view, setView] = useState('catalog'); // 'catalog' o 'history'

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.pointsCounter}>Points: <span id="points">0</span></div>
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
                <CatalogView />
            ) : (
                <HistoryView />
            )}
        </div>
    );
};

export default Catalog;
