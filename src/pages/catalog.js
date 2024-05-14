import React, { useState } from 'react';
import styles from '../styles/catalog.module.css';

// Componente para mostrar artículos del catálogo
const CatalogView = () => {
    const items = [
        { id: 1, name: 'Artículo 1', description: 'Descripción del Artículo 1', points: 100, image: '/lapulpe.png' },
        { id: 2, name: 'Artículo 2', description: 'Descripción del Artículo 2', points: 200, image: '/lapulpe.png' },
        { id: 3, name: 'Artículo 3', description: 'Descripción del Artículo 3', points: 300, image: '/lapulpe.png' },
        { id: 4, name: 'Artículo 4', description: 'Descripción del Artículo 4', points: 100, image: '/lapulpe.png' },
        { id: 5, name: 'Artículo 5', description: 'Descripción del Artículo 5', points: 200, image: '/lapulpe.png' },
        { id: 6, name: 'Artículo 6', description: 'Descripción del Artículo 6', points: 300, image: '/lapulpe.png' },
        { id: 7, name: 'Artículo 7', description: 'Descripción del Artículo 7', points: 100, image: '/lapulpe.png' },
        { id: 8, name: 'Artículo 8', description: 'Descripción del Artículo 8', points: 200, image: '/lapulpe.png' },
        { id: 9, name: 'Artículo 9', description: 'Descripción del Artículo 9', points: 300, image: '/lapulpe.png' },
        { id: 10, name: 'Artículo 10', description: 'Descripción del Artículo 10', points: 100, image: '/lapulpe.png' },
        { id: 11, name: 'Artículo 11', description: 'Descripción del Artículo 11', points: 200, image: '/lapulpe.png' },
        { id: 12, name: 'Artículo 12', description: 'Descripción del Artículo 12', points: 300, image: '/lapulpe.png' },
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
                    <p className={styles.itemPoints}>Puntos: {item.points}</p>
                    <button className={styles.requestButton}>Solicitar</button>
                </div>
            ))}
        </div>
    );
};

// Componente para mostrar el historial de puntos
const HistoryView = () => {
    const history = [
        { id: 1, date: '2024-01-01', points: 100, description: 'Solicitud de Artículo 1' },
        { id: 2, date: '2024-02-01', points: 200, description: 'Solicitud de Artículo 2' },
        { id: 3, date: '2024-03-01', points: 300, description: 'Solicitud de Artículo 3' },
        // Añade más registros según sea necesario
    ];

    return (
        <div className={styles.historyView}>
            {history.map(entry => (
                <div key={entry.id} className={styles.historyItem}>
                    <p>{entry.date}</p>
                    <p>{entry.description}</p>
                    <p>Puntos: {entry.points}</p>
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
                <div className={styles.pointsCounter}>Puntos: <span id="points">0</span></div>
                <div className={styles.anuncio}>
                    <div className={styles.texto}>Consume</div>
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
