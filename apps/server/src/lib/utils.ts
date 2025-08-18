
export function convertToAscii(inputString: string): string {
    if (!inputString) {
        return '';
    }
    // remove non-ASCII characters
    const asciiString = inputString.replace(/[^\x00-\x7F]/g, '');
    return asciiString;
}