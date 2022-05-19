import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'
import { SvgComponent } from '../../components'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <SvgComponent />
            </View>
            <View style={styles.title}>
                <Text style={styles.welcome}>WELCOME</Text>
            </View>
        </View>
    )
}

export default HomeScreen
