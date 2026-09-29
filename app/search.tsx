import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Article, RootStackParamList } from '@/constants/types'
import { useDebounce } from '@uidotdev/usehooks'
import { ChevronLeft, } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import SearchedArticles from '@/components/features/SearchedArticles'

const search = () => {
  
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const API_KEY = process.env.EXPO_PUBLIC_API_KEY
  const [search_query, set_search_query] = useState('')
  const debounced_search_query = useDebounce(search_query, 800)

  const { isFetching, error, data } = useQuery<Article[]>({
    queryKey: ['search_results', debounced_search_query],
    queryFn: () => handle_search_articles(debounced_search_query),
    // enabled: false,
    enabled: debounced_search_query.length > 1,
    initialData: []
  })

  const handle_search_articles = async (query: string): Promise<Article[]> => {

    try {

      const url = `https://newsapi.org/v2/everything?q=${query}=gb&sortBy=publishedAt&apiKey=${API_KEY}`

      console.log(url)
      const response = await fetch(url)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`NewsAPI error: ${data.message || response.status}`);
      }

      return data.articles as Article[]

    }
    catch (error) {
      throw error
    }

  }

  const handle_change_search_query = (text: string): void => {
    set_search_query(text)
  }

  return (
    <SafeAreaView
      className='bg-slate-900 w-full h-screen p-5 px-7 flex flex-col gap-8'
    >

      {/* back btn & search bar */}
      <View
        className='flex flex-row items-center gap-4 w-full h-auto'
      >

        <TouchableOpacity
          className='p-2 rounded-full bg-slate-700 w-1/10'
          onPress={() => nav.goBack()}
        >
          <ChevronLeft
            size={24}
            strokeWidth={1.5}
            color={'#ffffff'}
          />
        </TouchableOpacity>

        <TextInput
          className='h-auto bg-slate-700 w-[85%] rounded-full pl-5 text-slate-200 placeholder:text-slate-400 font-poppins_regular pb-2'
          placeholder='Search an article...'
          value={search_query}
          onChangeText={(text) => handle_change_search_query(text)}
        />

      </View>
  
      <SearchedArticles
        data={data}
        isFetching={isFetching}
        error={error}
        debounced_search_query={debounced_search_query}
      />    

    </SafeAreaView>
  )
}



export default search