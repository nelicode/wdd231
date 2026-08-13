export async function fetchWeather(lat = -12.0464, lon = -77.0428) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API error');
        const data = await response.json();
        return data.current_weather;
    } catch (error) {
        console.error('Weather fetch failed:', error);
        return null;
    }
}