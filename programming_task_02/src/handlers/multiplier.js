class Multiplier {
    static handle(...sources) {
        return (sources || []).reduce(
            (acc, source) => ({
                result: acc.result * source.result
            }),
            {
                result: 1
            }
        );
    }
}

module.exports = Multiplier;