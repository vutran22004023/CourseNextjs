import React from 'react'
interface Prop {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'header' | 'subtitleDefault';
    className?: string
    children?: React.ReactNode;
}
export default function Text({type = 'default', children,className,...rest}:Prop) {
  return (
    <div className={
        `
        ${type === 'default' ? 'text-[16px] text-[#000]': undefined}
        ${type === 'title' ? 'text-[32px] font-bold l leading-8 text-[#000] cactus-classical-serif-md': undefined}
        ${type === 'defaultSemiBold' ? 'text-base font-bold leading-6 text-[#000] cactus-classical-serif-md': undefined}
        ${type === 'subtitle' ? 'text-2xl font-bold text-[#000] cactus-classical-serif-md': undefined}
        ${type === 'subtitleDefault' ? 'text-2xl text-[#000] cactus-classical-serif-md': undefined}
        ${type === 'header' ? 'text-3xl font-bold text-[#000] cactus-classical-serif-md': undefined}
        ${className}
        `
    }
    >{children}</div>
  )
}
