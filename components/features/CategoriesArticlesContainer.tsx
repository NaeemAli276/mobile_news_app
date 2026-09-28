import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Article, RootStackParamList } from '@/constants/types'
import { Spinner } from '../ui/Spinner'
import { Loader, DatabaseX } from 'lucide-react-native'
import SmallNewsCard from '../ui/SmallNewsCard'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface CategoriesArticlesContainerProps {
    data: Article[],
    isFetching: boolean
    error: Error | null
}

const CategoriesArticlesContainer: React.FC<CategoriesArticlesContainerProps> = ({
    data,
    isFetching,
    error
}) => {

    const insets = useSafeAreaInsets();

    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    if (isFetching) {
        return (
            <View
                className='w-full h-64 flex items-center justify-center'
            >
                <Spinner>
                    <Loader 
                        color={'#14b8a6'}
                    />
                </Spinner> 
            </View>
        )
    }
    if (error) {
        return (
            <View
                className='w-full h-64 flex flex-col gap-2 items-center justify-center' 
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
    else {
        return (
            <FlatList
                data={data}
                contentContainerStyle={{ paddingBottom: insets.bottom + 420 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
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
                showsHorizontalScrollIndicator={false}
            />
        )
    }

}

export default CategoriesArticlesContainer