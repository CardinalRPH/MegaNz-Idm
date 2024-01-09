export default (fileSize) => {
    const bytesToGB = (bytes) => {
        const GB = bytes / (1024 * 1024 * 1024);
        return GB.toFixed(2) + ' GB';
    };

    const MB = fileSize / (1024 * 1024);

    if (MB > 100) {
        return bytesToGB(fileSize);
    }

    return MB.toFixed(2) + ' MB';
}