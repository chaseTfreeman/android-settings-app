const fetchAttributes = async fetchParams => {
    const fetcher = url =>
        fetch(url, { credentials: 'include' })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch(resp => {
                const error = new Error(resp.statusText || resp.status)
                console.error(
                    `fetchAttributes ${fetchParams.filter} fetch error: `,
                    error
                )
                return Promise.reject(error)
            })

    const fields = `${fetchParams.field}`
    const filters = `${fetchParams.filter}`
    const url = `${fetchParams.url}.json?paging=false&fields=${fields}&filter=${filters}`

    const json = await fetcher(url).catch(error => Promise.reject(error))

    return json[fetchParams.attribute]
}

export default fetchAttributes
