import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface TouchableIconProps {
    icon: React.ReactNode,
    ftn: () => void 
}

const TouchableIcon: React.FC<TouchableIconProps> = ({ icon, ftn }) => {
    return (
        <TouchableOpacity
            className='bg-slate-700 p-2 rounded-full'
            onPress={ftn}
        >
            {icon}
        </TouchableOpacity>
    )
}

export default TouchableIcon