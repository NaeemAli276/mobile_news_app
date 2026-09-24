import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery } from '@tanstack/react-query'
import { Article, API_KEY, RootStackParamList } from '@/constants/types'
import LargeNewsCard from '../ui/LargeNewsCard'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Spinner } from '../ui/Spinner'
import { Loader, DatabaseX } from 'lucide-react-native'

const BreakingNewsSection = () => {

    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const get_breaking_news = async (): Promise<Article[]> => {
        console.log('🔥 Running get_breaking_news');
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`;
        console.log('URL:', url.replace(API_KEY, '***'));
        
        const response = await fetch(url);
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Body:', data);
        
        if (!response.ok) {
            throw new Error(`NewsAPI error: ${data.message || response.status}`);
        }
        return data.articles as Article[];
    };

    const { isFetching, error, data } = useQuery<Article[]>({
        queryKey: ['get_breaking_news'],
        queryFn: get_breaking_news,
        initialData: [],
        enabled: true
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isFetching) {
        return (
            <View
                className='w-full h-72 bg-neutral-200 flex items-center justify-center rounded-md'
            >
                <Spinner>
                    <Loader/>
                </Spinner>
            </View>
        )
    }
    else if (error) {
        return (
            <View
                className='w-full h-72 gap-3 bg-neutral-100 flex items-center justify-center rounded-md'
            >
                <View
                    className='p-2 rounded-full'
                >
                    <DatabaseX
                        size={48}
                        strokeWidth={1.5}
                        color={'#000000'}
                    />
                </View>

                <View
                    className=''
                >
                    <Text
                        className='text-2xl font-semibold text-center text-black'
                    >
                        Error
                    </Text>
                    <Text
                        className='text-black/70 w-64 text-center'
                    >
                        An error has occured when trying to retrieve articles please refresh the app
                    </Text>
                </View>

            </View>
        )
    }
    else {
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <LargeNewsCard
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
        )
    }

    
}

export default BreakingNewsSection