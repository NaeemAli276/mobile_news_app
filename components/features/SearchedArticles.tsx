import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Article, RootStackParamList } from '@/constants/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, DatabaseX, Loader, SearchX } from 'lucide-react-native'
import { Spinner } from '../ui/Spinner'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import SmallNewsCard from '../ui/SmallNewsCard'

interface SearchedArticlesProps {
    data: Article[]
    isFetching: boolean
    error: null | Error
    debounced_search_query: string
}

const SearchedArticles: React.FC<SearchedArticlesProps> = ({
    data,
    isFetching,
    error,
    debounced_search_query
}) => {

    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    
    useEffect(() => {
        console.log(data)
    }, [data])

    // no search query
    if (isFetching === false && debounced_search_query.length <= 0) {
        return (
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
        )
    }

    // failed to get any articles
    if (isFetching === false && data?.length <= 0) {
        return (
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
        )
    }

    // fetching articles
    if (isFetching) {
        return (
            <View
                className={`${isFetching ? 'flex' : 'hidden'} w-full h-3/4 items-center justify-center gap-4`}
            >
                <Spinner>
                    <Loader
                        color={'#14b8a6'}
                        size={44}
                        strokeWidth={1}
                    />
                </Spinner>
            </View>
        )
    }

    if (error) {
        return (
            <View
                className={`${error !== null ? 'flex' : 'hidden'} w-full h-3/4 items-center justify-center gap-4`}
            >
                <DatabaseX
                    color={'#14b8a6'}
                    size={44}
                    strokeWidth={1}
                    className='animate-spin'
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
        )
    }

    if (data.length > 0) {
        return (
            <View
                className='flex-1'
            >
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
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
                    scrollEnabled={true}
                    nestedScrollEnabled={true}  // needed on Android when nested
                    contentContainerClassName='gap-3'
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

}

export default SearchedArticles