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

export const adminValidation = (id_user_in_session: string, id_manager: string) => {
    return id_manager === id_user_in_session;
}