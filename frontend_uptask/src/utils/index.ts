export const dateFormat = (data: string) => {
    const date = new Date(data);
    return Intl.DateTimeFormat("es-Mx", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).format(date);
}