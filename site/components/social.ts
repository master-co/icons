export function socialMetadata(title:string,description:string,image:string) {
 return {
  description,
  openGraph:{title,description,siteName:'Master Icons',images:image},
  twitter:{card:'summary_large_image',title,description,images:image}
 }
}
