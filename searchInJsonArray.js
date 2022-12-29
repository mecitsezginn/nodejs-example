const myLowerCase = (text) => {
    text = text.replace(/Ğ/gim, "ğ")
        .replace(/Ü/gim, "ü")
        .replace(/Ş/gim, "ş")
        .replace(/İ/gim, "i")
        .replace(/Ö/gim, "ö")
        .replace(/Ç/gim, "ç")

    return text.toLowerCase()
}

export const filterData = (key, dataArray) =>{
    let result = []
    let text = myLowerCase(key)

    dataArray.map((item) => {
        let keys = Object.keys(item)
        for (let i = 0; i < keys.length; i++) {
            let sentence = myLowerCase(String(item[keys[i]]))
            
            if (sentence.includes(text)) {
                result.push(item)
                break
            }
        }
    })

    return result
}