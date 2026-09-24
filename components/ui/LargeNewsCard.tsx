import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Article } from '@/constants/types'

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
    content
}) => {
    return (
        <Pressable
            className=''
        >
            
        </Pressable>
    )
}

export default LargeNewsCard