function imageSrcValidator(strOrFile) {
    if (strOrFile) {
        if (strOrFile instanceof File) {
            return URL.createObjectURL(strOrFile);
        } else if (typeof strOrFile === 'string' && strOrFile.length > 0) {
            return strOrFile;
        } else {
            return '';
        }
    } else {
        return '';
    }
}

// Usage
// const src = imageSrcValidator('')

export default imageSrcValidator