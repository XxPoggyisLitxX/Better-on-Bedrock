
export function setIcon(msg, shortName, glyphHex) {
    let value = ""
    value = msg.replaceAll(new RegExp(`:::${shortName}`, 'gi'), String.fromCodePoint(glyphHex))
    return value;
}

//export default setIcon