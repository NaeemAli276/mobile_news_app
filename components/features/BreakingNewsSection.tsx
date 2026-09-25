import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [articles, setArticles] = useState<Article[]>([
        {
            source:{"id":"cbs-news","name":"CBS News"},
            author:"Frank  Andrews, Khaled  Wassef",
            title:"Iran War Updates: Iran's president calls U.S. attacks \"cowardly\" as Trump threatens annihilation - CBS News",
            description:"U.S. and Iranian delegations met on the sidelines of the U.N. General Assembly, rekindling diplomacy amid Trump's threat to \"annihilate\" the regime.",
            url:"https://www.cbsnews.com/live-updates/iran-war-trump-un-speech-annihilate-threat-talks-resume",
            urlToImage:"https://assets3.cbsnewsstatic.com/hub/i/r/2026/09/23/df100486-1cfd-46ce-8b55-2e8ee561a9c8/thumbnail/1200x630g2/696969ad6c27877bb3947a10b87404dd/gettyimages-2295281111.jpg",
            publishedAt:"2026-09-24T05:17:31Z",
            content:"Students in Iran returned to schools and universities Wednesday after months of closures due to the war with the United States, which has seen major attacks including a strike on the first day of the… [+1473 chars]"
        },
        {
            source:{"id":null,"name":"BBC News"},
            author:null,
            title:"Ethiopia and Tigray accuse each of launching offensives, fuelling fears of new war - BBC",
            description:"The local authorities reportedly seize Tigray's airports following reports of recent drone strikes.",
            url:"https://www.bbc.com/news/articles/cry8zwwq21pxo",
            urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/9b8d/live/5b472620-b767-11f1-a7b2-f3bdba1cd194.jpg",
            publishedAt:"2026-09-24T04:37:47Z",
            content:"Getachew said in a statement shared on social media: \"It is rather heartbreaking to learn that, despite efforts by many, including the international community, to avoid yet another round of war in Ti… [+123 chars]"
        },
        {
            source:{"id":null,"name":"Financial Times"},
            author:null,
            title:"Global bond sell-off deepens as oil holds above $100 - Financial Times",
            description:"Rising yields strain public finances as expectations of Fed rate rise in October jump to about 70%",
            url:"https://www.ft.com/content/2d87f8bf-d529-4997-90c5-393ef65d280c?syn-25a6b1a6\\\\u003d1",urlToImage:"https://images.ft.com/v3/image/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F9c1591aa-a6a9-4251-b153-0a216b346939.png?source=next-barrier-page&fit=scale-down&quality=highest&width=700&dpr=1",
            publishedAt:"2026-09-24T04:03:57Z",
            content:null
        },
    ])

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
        enabled: false
    })

    useEffect(() => {
        console.log(articles)
    }, [articles])

    // if (isFetching) {
    //     return (
    //         <View
    //             className='w-full h-72 bg-neutral-200 flex items-center justify-center rounded-md'
    //         >
    //             <Spinner>
    //                 <Loader/>
    //             </Spinner>
    //         </View>
    //     )
    // }
    // else if (error) {
    //     return (
    //         <View
    //             className='w-full h-72 gap-3 bg-neutral-100 flex items-center justify-center rounded-md'
    //         >
    //             <View
    //                 className='p-2 rounded-full'
    //             >
    //                 <DatabaseX
    //                     size={48}
    //                     strokeWidth={1.5}
    //                     color={'#000000'}
    //                 />
    //             </View>

    //             <View
    //                 className=''
    //             >
    //                 <Text
    //                     className='text-2xl font-semibold text-center text-black'
    //                 >
    //                     Error
    //                 </Text>
    //                 <Text
    //                     className='text-black/70 w-64 text-center'
    //                 >
    //                     An error has occured when trying to retrieve articles please refresh the app
    //                 </Text>
    //             </View>

    //         </View>
    //     )
    // }
    
        return (
            <View
                className='flex flex-col gap-8 w-full h-auto'
            >

                <Text
                    className='text-3xl font-bold text-white'
                >
                    Top News
                </Text>

                <FlatList
                    horizontal
                    data={articles}
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
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName='flex flex-row gap-5 h-[21rem] pr-3'
                />
            </View>
        )
    }

    

export default BreakingNewsSection