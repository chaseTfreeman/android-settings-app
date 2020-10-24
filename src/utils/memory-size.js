export function memorySizeOf(obj) {
    let bytes = 0

    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    bytes += 8
                    break
                case 'string':
                    bytes += obj.length * 2
                    break
                case 'boolean':
                    bytes += 4
                    break
                case 'object':
                    const objClass = Object.prototype.toString
                        .call(obj)
                        .slice(8, -1)
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (const key in obj) {
                            if (!obj.hasOwnProperty(key)) continue
                            sizeOf(obj[key])
                        }
                    } else bytes += obj.toString().length * 2
                    break
                default:
            }
        }
        return bytes
    }

    return sizeOf(obj)
}

export function formatByteSize(bytes) {
    if (bytes < 1024) return bytes
    else return Math.round(bytes / 1024)
}
