import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Article, API_KEY } from '@/constants/types'
import { useDebounce } from '@uidotdev/usehooks'
import { ChevronLeft, Search, SearchX, DatabaseX } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const search = () => {
  
  const [search_query, set_search_query] = useState('')
  const debounced_search_query = useDebounce(search_query, 800)

  const { isFetching, error, data } = useQuery<Article[]>({
    queryKey: ['search_results', debounced_search_query],
    queryFn: () => handle_search_articles(debounced_search_query),
    enabled: false,
    initialData: []
  })

  const handle_search_articles = async (query: string): Promise<Article[]> => {

    try {

      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}=en&sortBy=publishedAt&apiKey=${API_KEY}`)

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
      className='bg-slate-900 w-full h-screen p-5 px-7 flex flex-col gap-4'
    >

      {/* back btn & search bar */}
      <View
        className='flex flex-row items-center gap-4 w-full h-auto'
      >

        <TouchableOpacity
          className='p-2 rounded-full bg-slate-700 w-1/10'
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

      {/* no search values */}
      <View
        className={`${isFetching === false && debounced_search_query.length <= 0 ? 'flex' : 'hidden'} w-full h-3/4 items-center justify-center gap-4`}
      >

        <Search
          color={'#14b8a6'}
          size={80}
          strokeWidth={1}
        />
        <View
          className='flex flex-col gap-1 w-full h-auto items-center justify-center'
        >
          <Text
            className='text-2xl font-newsreader_medium text-white'
          >
            Empty search query
          </Text>
          <Text
            className='text-lg font-newsreader_medium text-white/70 text-center px-5'
          >
            Type something in the search bar to find some articles
          </Text>
        </View>

      </View>

      {/* no searches found */}
      <View
        className={`${isFetching === false && data?.length <= 0 ? 'flex' : 'hidden'} w-full h-3/4 items-center justify-center gap-4`}
      >
        <SearchX
          color={'#14b8a6'}
          size={80}
          strokeWidth={1}
        />
        <View
          className='flex flex-col gap-1 w-full h-auto items-center justify-center'
        >
          <Text
            className='text-2xl font-newsreader_medium text-white'
          >
            No results found
          </Text>
          <Text
            className='text-lg font-newsreader_medium text-white/70 text-center px-5'
          >
            Type something else in the search bar to find articles.
          </Text>
        </View>
      </View>

      {/* error */}
      <View
        className={`${error !== null ? 'flex' : 'hidden'} w-full h-3/4 items-center justify-center gap-4`}
      >
        <DatabaseX
          color={'#14b8a6'}
          size={80}
          strokeWidth={1}
        />
        <View
          className='flex flex-col gap-1 w-full h-auto items-center justify-center'
        >
          <Text
            className='text-2xl font-newsreader_medium text-white'
          >
            An error has occured
          </Text>
          <Text
            className='text-lg font-newsreader_medium text-white/70 text-center px-5'
          >
            Type something else in the search bar or restart the app.
          </Text>
        </View>
      </View>
    

    </SafeAreaView>
  )
}

export default search