import React from 'react'
import { Spin } from 'antd'
interface LoadingProps {
    IsLoading: boolean;
    children: React.ReactNode;
}

export default function Loading({IsLoading,children}: LoadingProps) {
  return (
    <Spin size="small" spinning={IsLoading}>
      {children}
    </Spin>
  )
}
