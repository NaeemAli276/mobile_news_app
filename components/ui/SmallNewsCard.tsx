import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { Article } from '@/constants/types'
import { ImageIcon } from 'lucide-react-native'
import { formatDate, truncateText } from '@/utils/textUtils'

interface SmallNewsCardProps extends Article {
    ftn: () => void
}

const SmallNewsCard: React.FC<SmallNewsCardProps> = ({
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content
}) => {

    const [thumbnail_error, set_thumbnail_error] = useState(false)
    const imageSource = typeof urlToImage === 'string' 
        ? { uri: urlToImage }       // Network image object
        : urlToImage;   

    const handle_image_error = (): void => {
        set_thumbnail_error(true)
    }

    return (
        <Pressable
            className='flex flex-row gap-3 w-full h-24'
        >
            
            {
                thumbnail_error
                ?   <View
                        className='aspect-square size-20 bg-slate-800 flex items-center justify-center rounded-lg'
                    >
                        <ImageIcon
                            color={'#475569'}
                            strokeWidth={1}
                            size={54}
                        />
                    </View>
                :   <Image
                        source={imageSource}
                        className='aspect-square size-20 rounded-lg'
                        onError={() => handle_image_error()}
                    />
            }

            <View
                className='w-full h-full flex flex-col gap-2'
            >
                <Text
                    className='text-white font-medium mr-20'
                >
                    {truncateText(title, 64)}
                </Text>

                <View
                    className='flex flex-row items-center justify-between'
                >
                    <Text
                        className='text-white/70 font-light text-sm w-auto'
                    >
                        {formatDate(publishedAt)}
                    </Text>
                    <Text
                        className={`${author !== null ? 'w-3/5' : 'w-auto'} text-sm font-regular text-white/70 `}
                    >
                        {   
                            author !== null
                            ? truncateText(author, 12)
                            : 'No author'    
                        }
                    </Text>
                </View>

            </View>

        </Pressable>
    )
}

export default SmallNewsCard