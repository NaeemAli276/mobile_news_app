import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import { Article } from '@/constants/types'
import { ImageIcon, X } from 'lucide-react-native'
import { truncateText, formatDate } from '../../utils/textUtils'


interface LargeNewsCardProps extends Article {
    ftn: () => void
}

const LargeNewsCard: React.FC<LargeNewsCardProps> = ({ 
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    ftn
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
            className='relative aspect-video flex flex-col w-[21rem] h-auto'
            onPress={ftn}
        >

            {
                thumbnail_error
                ?   <View
                        className='aspect-video size-48 bg-slate-800 flex items-center justify-center rounded-xl flex-col gap-2'
                    >
                        <ImageIcon
                            color={'#475569'}
                            strokeWidth={1}
                            size={54}
                        />
                    </View>   
                :   <Image
                        source={imageSource}
                        className='aspect-video size-48 rounded-xl'
                        onError={() => handle_image_error()}
                    />
            }

            <View
                className='w-full h-auto flex flex-col gap-2 rounded-b-md p-5 px-2'
            >
                <Text
                    className='w-full text-lg text-white font-newsreader_medium'
                >  
                    {truncateText(title, 72)}
                </Text>

                <View
                    className='flex flex-row-reverse items-center justify-between'
                >
                    <Text
                        className='text-white/70 font-newsreader_regular text-sm'
                    >
                        {formatDate(publishedAt)}
                    </Text>
                    <Text
                        className={`${author !== null ? 'w-3/5' : 'w-1/4'} text-sm font-newsreader_regular text-white/70 mr-0`}
                    >
                        {   
                            author !== null
                            ? truncateText(author, 24)
                            : 'No author'    
                        }
                    </Text>
                </View>
            </View>

        </Pressable>
    )
}

export default LargeNewsCard