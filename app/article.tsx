import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

const article = ({  }) => {

    const { source, title, publishedAt, urlToImage, url, description, content  } = useLocalSearchParams()

    return (
        <View>
            <Text>article</Text>
        </View>
    )
}

export default article