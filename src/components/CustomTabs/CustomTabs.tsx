import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs/Tabs'
import { TTabs } from '@/types/types'

type TCustomTabsProps = {
  tabs: TTabs[]
  defaultValue: string
  form?: boolean
}
const CustomTabs = ({ tabs, defaultValue, form = false }: TCustomTabsProps) => {
  return (
    <div className='h-full'>
      <Tabs defaultValue={defaultValue} className='h-full'>
        <TabsList className='overflow-x-auto no-scrollbar mb-6 sm:mb-4 w-full flex justify-start border-b border-gray-100'>
          {tabs &&
            tabs.map(tab => (
              <TabsTrigger key={tab.type} value={tab.type}>
                {tab.value}
              </TabsTrigger>
            ))}
        </TabsList>
        {tabs &&
          tabs.map(tab => (
            <TabsContent key={tab.type} value={tab.type}>
              {tab.content}
            </TabsContent>
          ))}
      </Tabs>
    </div>
  )
}

export default CustomTabs
