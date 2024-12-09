export function convertToGMTMinus3Date(timestamp: Date): Date {
    const date = new Date(timestamp);

    if(isNaN(date.getTime())) {
        throw new Error('Timestamp inválido');
    }

    const gmtMinus3Date = new Date(date.getTime() - 3 * 60 * 60 * 1000);

    return gmtMinus3Date;
}