
class TableIterator {
    constructor(ids) {
        this.ids = ids
        this.iteration = 0
        this.total_bits = this.ids.length
        this.total_iterations = Math.pow(2, this.total_bits)
    }

    static numToBinArray(num, bits) {
        const array = num.toString(2).split("")
        while(array.length < bits) array.unshift('0')
        return array
    }

    next() {
        const array = TableIterator.numToBinArray(this.iteration, this.total_bits)

        const next = {}
        for(let i=0; i<this.total_bits; i++)
            next[this.ids[i]] = parseInt(array[i])
        
        this.iteration++
        return next
    }

    hasNext() {
        return this.iteration < this.total_iterations
    }
}

module.exports = TableIterator