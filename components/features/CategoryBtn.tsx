import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CategoryBtnProps {
    ftn: () => void
    name: string
    icon: React.ReactNode,
    is_active: boolean
}

const CategoryBtn: React.FC<CategoryBtnProps> = ({
    ftn,
    name,
    icon, 
    is_active
}) => {
    return (
        <TouchableOpacity
            className={`${is_active ? 'bg-teal-500' : 'bg-slate-800'} p-2 rounded-full px-3 flex flex-row items-center gap-2 pr-3.5`}
            onPress={ftn}
        >
            {icon}
            <Text
                className={`${is_active ? 'text-white' : 'text-slate-300'}`}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoryBtn