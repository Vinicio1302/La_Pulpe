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
    const [items, setItems] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            const formattedName = formatUsername(storedUsername);
            setName(formattedName);
            fetchUserPoints(storedUsername);
            fetchUserHistory(storedUsername);
        }

        // Fetch items from the inventory API
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/inventory', {
                    method: 'GET',
                });
                const data = await response.json();
                if (data.success) {
                    setItems(data.items);
                } else {
                    console.error('Error fetching items:', data.message);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
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

    const handleProfileUpdate = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, newPassword }),
            });

            const data = await response.json();
            if (data.success) {
                setSuccessMessages(prev => ({ ...prev, profile: 'Password updated successfully!' }));
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError('');
            } else {
                console.error('Error updating password:', data.message);
            }
        } catch (error) {
            console.error('Error updating password:', error);
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
                    <button
                        onClick={() => setView('profile')}
                        className={view === 'profile' ? styles.active : ''}
                    >
                        Profile
                    </button>
                </div>
            </div>

            {view === 'catalog' && (
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
            )}

            {view === 'history' && (
                <div className={styles.historyView}>
                    <h2>History View</h2>
                    {history.length > 0 ? (
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Points Spent</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.itemName}</td>
                                        <td>{entry.itemPoints}</td>
                                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                                        <td>{entry.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No history available.</p>
                    )}
                </div>
            )}

            {view === 'profile' && (
                <div className={styles.profileView}>
                    <form onSubmit={handleProfileUpdate} className={styles.profileForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {passwordError && (
                            <p className={styles.errorMessage2}>{passwordError}</p>
                        )}
                        {successMessages.profile && (
                        <p className={styles.successMessage2}>{successMessages.profile}</p>
                        )}
                        <button className={styles.profileButton} type="submit">Update Password</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Catalog;
