const FAVORITES_KEY = 'coffee_favorites';

export function getFavorites() {
    try {
        const data = localStorage.getItem(FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

export function toggleFavorite(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}