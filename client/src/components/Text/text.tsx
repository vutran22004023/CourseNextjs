import React from 'react'
interface Prop {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle';
    className?: string
    children?: React.ReactNode;
}
export default function Text({type = 'default', children,className,...rest}:Prop) {
  return (
    <div className={
        `
        ${type === 'default' ? 'text-[16px] text-[#000]': undefined}
        ${type === 'title' ? 'text-[32px] font-bold l leading-8 text-[#000] cactus-classical-serif-md': undefined}
        ${type === 'defaultSemiBold' ? 'text-[16px] font-bold leading-6 text-[#000] cactus-classical-serif-md': undefined}
        ${type === 'subtitle' ? 'text-[20px] font-bold text-[#000] cactus-classical-serif-md': undefined}
        ${className}
        `
    }
    >{children}</div>
  )
}
