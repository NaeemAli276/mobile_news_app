export function truncateText(str: string, maxLength: number): string {

    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;

}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.getUTCFullYear();
    
    return `${day} ${month} ${year}`;
}