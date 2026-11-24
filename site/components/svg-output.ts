export function svgDownload(file:string) {
 return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(file)}`
}

export function svgFile(svg:string,header:string) {
 return header+svg+'\n'
}
