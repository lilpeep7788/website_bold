import type { ImgHTMLAttributes } from 'react'

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string }

export function ResponsiveImage({ src, alt, ...props }: ResponsiveImageProps) {
  const base = src.replace(/\.png$/i, '')
  return <picture className="responsive-image"><source type="image/avif" srcSet={`${base}.avif`} /><source type="image/webp" srcSet={`${base}.webp`} /><img src={src} alt={alt} {...props} /></picture>
}
