import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Bookmark, ImageIcon } from 'lucide-react-native'
import { formatDate } from '@/utils/textUtils'
import { already_exists, deleteArticle, saveArticle } from '@/storage/articles'

const article = ({  }) => {

    const { source, title, publishedAt, urlToImage, url, description, content, author } = useLocalSearchParams()

    const [is_bookmarked, set_is_bookmarked] = useState(false)
    const [thumbnail_error, set_thumbnail_error] = useState(false)

    const nav = useNavigation()

    const handle_navigate_back = (): void => {
        nav.goBack()
    }

    const handle_image_error = (): void => {
        set_thumbnail_error(true)
    }

    const handle_change_bookmark = (): void => {

        if (is_bookmarked) {
            deleteArticle(`${url}`)
            console.log('is_not_bookmarked')
            set_is_bookmarked(false)
        }
        else {

            const current_article = {
                source: source,
                title: title,
                publishedAt: publishedAt,
                urlToImage: urlToImage,
                url: url,
                description: description,
                content: content,
                author: author
            }

            saveArticle(current_article)
            set_is_bookmarked(true)

            console.log('is_bookmarked', current_article)
        }

    }

    // useEffect(() => {
    //     console.log(`
    //         source: ${source},
    //         title: ${title},
    //         publishedAt: ${publishedAt},
    //         urlToImage: ${urlToImage},
    //         url: ${url},
    //         description: ${description},
    //         content: ${content},
    //         author: ${author}
    //     `)
    // }, [])

    useEffect(() => {
        set_is_bookmarked(already_exists(`${url}`))
    }, [])

    return (
        <SafeAreaView
            className='bg-slate-900 w-full h-screen p-5 px-7 flex flex-col gap-10'
        >
            
            {/* btns */}
            <View
                className='w-full h-auto flex flex-row items-center justify-between'
            >

                {/* back btn */}
                <TouchableOpacity
                    className='p-1 rounded-full'
                    onPress={() => handle_navigate_back()}
                >
                    <ChevronLeft
                        color={'#ffffff'}
                        strokeWidth={1.5}
                        size={32}
                    />
                </TouchableOpacity>

                {/* bookmark btn */}
                <TouchableOpacity
                    className='p-1'
                    onPress={() => handle_change_bookmark()}
                >
                    {
                        is_bookmarked
                        ?   <Bookmark
                                color={'#ffffff'}
                                strokeWidth={1.5}
                                fill={'#ffffff'}
                            />
                        :   <Bookmark
                                color={'#ffffff'}
                                strokeWidth={1.5}
                            />   
                    }
                </TouchableOpacity>

            </View>

            {/* main content */}
            <ScrollView
                className='flex flex-col gap-10 w-full h-screen '                
            >

                {/* title & author details */}
                <View
                    className='flex flex-col gap-3 w-full h-auto'
                >
                    {/* author and date */}
                    <View
                        className='flex flex-row items-center justify-between'
                    >
                        <Text
                            className='text-white/90 font-newsreader_regular text-sm'
                        >
                            {
                                author == null
                                ? 'No author'
                                : author
                            }
                        </Text>
                        <Text
                            className='text-white/90 font-newsreader_regular text-sm'
                        >
                            {formatDate(`${publishedAt}`)}
                        </Text>
                    </View>

                    {/* title and desc */}
                    <View
                        className='flex flex-col gap-2 w-full h-auto'
                    >
                        <Text
                            className='text-2xl font-newsreader_semibold text-white'
                        >
                            {title}
                        </Text>
                        <Text
                            className='text-sm text-white/70 font-newsreader_regular'
                        >
                            {description}
                        </Text>
                    </View>

                </View>

                {
                    thumbnail_error
                    ?   <View
                            className='aspect-video w-full bg-slate-800 flex items-center justify-center rounded-xl flex-col gap-2'
                        >
                            <ImageIcon
                                color={'#475569'}
                                strokeWidth={1}
                                size={54}
                            />
                        </View>   
                    :   <View
                            className='pt-5'
                        >
                            <Image
                                source={{ uri: `${urlToImage}` }}
                                className='aspect-video rounded-xl'
                                onError={() => handle_image_error()}
                            />
                        </View>
                }

                <Text
                    className='text-white font-newsreader_regular text-lg pt-5'
                >
                    {content}
                </Text>

            </ScrollView>

        </SafeAreaView>
    )
}

export default article