import { View, Text } from 'react-native'
import React from 'react'
import TouchableIcon from '../ui/TouchableIcon'
import { Bookmark, Search } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/types'

const Topbar = () => {

    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View
            className='w-full h-auto flex flex-row items-center justify-between gap-3 '
        >

            <Text
                className='font-medium text-2xl text-teal-500'
            >
                Stratum
            </Text>

            <View
                className='flex flex-row items-center gap-4'
            >   
                {/* bookmark btn */}
                <TouchableIcon
                    icon={
                        <Bookmark
                            size={20}
                            color={'#14b8a6'}
                            strokeWidth={1.5}
                            fill={'#14b8a6'}
                        />
                    }
                    ftn={() => nav.navigate('bookmarked')}
                />

                {/* search btn */}
                <TouchableIcon
                    icon={
                        <Search
                            size={20}
                            color={'#14b8a6'}
                            strokeWidth={1.5}
                            fill={'#14b8a6'}
                        />
                    }
                    ftn={() => nav.navigate('search')}
                />
            </View>

        </View>
    )
}

export default Topbar