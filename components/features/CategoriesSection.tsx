import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Article } from '@/constants/types'

const CategoriesSection = () => {
    
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
    
    return (
        <View
            className='flex flex-col gap-4 w-full h-auto'
        >

            <FlatList
                data={articles}
            />

        </View>
    )
}

export default CategoriesSection