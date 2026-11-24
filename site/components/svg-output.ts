export function svgDownload(file:string) {
 return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(file)}`
}

export function svgSnippet(svg:string,notice?:string) {
 return notice && svg ? `<!--\n${notice.replaceAll('--','—')}\n-->\n${svg}` : svg
}
