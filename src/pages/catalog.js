import React, { useState } from 'react';
import styles from '../styles/catalog.module.css';

// Componente para mostrar artículos del catálogo
const CatalogView = () => {
    const items = [
        { id: 1, name: 'Artículo 1', description: 'Descripción del Artículo 1', points: 100, image: 'data:image/jpeg;base64,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' },
        { id: 2, name: 'Artículo 2', description: 'Descripción del Artículo 2', points: 200, image: 'https://http2.mlstatic.com/D_Q_NP_2X_890900-MCR44497713710_012021-T.webp' },
        { id: 3, name: 'Artículo 3', description: 'Descripción del Artículo 3', points: 300, image: 'data:image/jpeg;base64,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' },
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


