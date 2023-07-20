class Newest {
    static handle(...sources) {
        return (sources || []).reduce((newestItem, source) => {
            if (source &&
                source.timestamp &&
                (!newestItem || new Date(source.timestamp) > new Date(newestItem.timestamp))) {
                return source;
            }

            return newestItem;
        }, null) || {};
    }
}

module.exports = Newest;