const splitSpeaks = (speaks) => {
    if (typeof speaks === 'string' && speaks.includes(',')) {
        const split = speaks.split(',')?.filter(s => s)?.map((s) => {
            return {
                label: split,
                value: s.trim().toLowerCase(),
            }
        });
        return split;
    } else if (Array.isArray(speaks) && speaks.length > 0) {
        return speaks;
    } else {
        throw new Error('Speaks must be an string with comma separated values');
    }
};

export default splitSpeaks;