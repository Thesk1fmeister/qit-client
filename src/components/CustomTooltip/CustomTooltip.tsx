import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip/Tooltip'
// @ts-ignore

type TCustomTooltipProps = {
  trigger: React.ReactNode
  children: React.ReactNode
}
const CustomTooltip = ({ trigger, children }: TCustomTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger> <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
