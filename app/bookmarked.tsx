import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Article, RootStackParamList } from '@/constants/types'
import { getAllArticles } from '@/storage/articles'
import SmallNewsCard from '@/components/ui/SmallNewsCard'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFocusEffect, useNavigation } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'

const bookmarked = () => {

  const [articles, set_articles] = useState<Article[]>([])

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useFocusEffect(
    useCallback(() => {
      set_articles(getAllArticles());
    }, []) // ✅ dependency array goes HERE, on useCallback
  ); // ✅ useFocusEffect takes ONLY the callback

  
  return (
    <SafeAreaView
      className='bg-slate-900 w-full h-screen p-5 px-7 flex flex-col gap-10'
    >

      <View
        className='w-full h-auto flex flex-row items-center justify-between'
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
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({item}) => (
          <SmallNewsCard
            source={item.source}
            author={item.author}
            title={item.title}
            description={item.description}
            url={item.url}
            urlToImage={item.urlToImage}
            publishedAt={item.publishedAt}
            content={item.content}
            ftn={() => nav.navigate('article', item)}
          />
        )}
      />

    </SafeAreaView>
  )
}

export default bookmarked