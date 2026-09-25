import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Topbar from '../components/features/Topbar'
import BreakingNewsSection from '@/components/features/BreakingNewsSection'

const index = () => {
  return (
    <SafeAreaView
      className='bg-slate-900 w-full h-screen p-5 px-7 flex flex-col gap-14'
    >
      <Topbar/>

      <BreakingNewsSection/>

      
    </SafeAreaView>
  )
}

export default index