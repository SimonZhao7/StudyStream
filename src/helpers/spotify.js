export const isTokenValid = () => {
    const { expires_in_ms, dateAccessed } = JSON.parse(localStorage.getItem('spotify'))
    return new Date() - expires_in_ms < new Date(dateAccessed)
}