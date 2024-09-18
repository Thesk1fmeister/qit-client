'use client'
import { useMemo } from 'react'
// config
import { IconConfig } from './config'
// types
import type { FC, SVGAttributes } from 'react'
import type { TIconName } from './types'

export type TIconProperties = SVGAttributes<SVGElement> & {
  /**
   * The name of the icon to render.
   */
  name: TIconName
}

export const MyxIcon: FC<TIconProperties> = props => {
  const { name, ...svgProperties } = props

  const IconComponent = useMemo(() => IconConfig[name], [name])

  return <IconComponent {...svgProperties} />
}
