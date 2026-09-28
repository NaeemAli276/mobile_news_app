import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Article, RootStackParamList } from '@/constants/types'
import SmallNewsCard from '../ui/SmallNewsCard'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Briefcase, Cpu, Globe, HeartPlus, Microscope, SportShoe, Tv } from 'lucide-react-native'
import CategoryBtn from './CategoryBtn'
import { useQuery } from '@tanstack/react-query'
import CategoriesArticlesContainer from './CategoriesArticlesContainer'

const CategoriesSection = () => {

    const API_KEY = process.env.EXPO_PUBLIC_API_KEY
    
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

    const [selected_category, set_selected_category] = useState('general')

    const categoryBtns = [
        {
            icon: <Globe color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <Globe color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'General'
        },
        {
            icon: <Briefcase color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <Briefcase color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'Business'
        },
        {
            icon: <Tv color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <Tv color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'Entertainment'
        },
        {
            icon: <HeartPlus color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <HeartPlus color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'Health'
        },
        {
            icon: <Microscope color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <Microscope color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'Science'
        },
        {
            icon: <SportShoe color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <SportShoe color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'Sports'
        },
        {
            icon: <Cpu color={'#cbd5e1'} strokeWidth={1.5} size={14}/>,
            active_icon: <Cpu color={'#ffffff'} strokeWidth={1.5} size={14}/>,
            name: 'Technology'
        },
    ]

    const get_articles_by_category = async (): Promise<Article[]> => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${selected_category}&pageSize=12&apiKey=${API_KEY}`;
            
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`NewsAPI error: ${data.message || response.status}`);
        }
        return data.articles as Article[];
    };

    const { isFetching, error, data } = useQuery<Article[]>({
        queryKey: ['get_article_by_category', selected_category],
        queryFn: () => get_articles_by_category(),
        initialData: [],
        enabled: false
    })

    return (
        <View
            className='flex flex-col gap-6 w-full h-auto mb-120'
        >

            <FlatList
                data={categoryBtns}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CategoryBtn
                        ftn={() => set_selected_category(item.name.toLocaleLowerCase())}
                        name={item.name}
                        icon={item.icon}
                        active_icon={item.active_icon}
                        is_active={selected_category === item.name.toLocaleLowerCase()}
                    />
                )}
                horizontal
                contentContainerClassName='flex flex-row items-center gap-2'
                showsHorizontalScrollIndicator={false}
            />

            <CategoriesArticlesContainer
                data={data}
                isFetching={isFetching}
                error={error}
            />

        </View>
    )
}

export default CategoriesSection