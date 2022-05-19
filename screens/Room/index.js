import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React , { useCallback }  from 'react'
import { View , Text , StatusBar, FlatList, TouchableOpacity , Image } from 'react-native'
import styles from './styles'
import { IMAGES } from '../../contains'
import { userModel } from '../../model'


let data = [
  {id : 1 ,name : 'Nodejs'        , img : IMAGES.nodejs},
  {id : 2 ,name : 'ReactJS'       , img : IMAGES.react},
  {id : 3 ,name : 'React Native'  , img : IMAGES.reactNative},
  {id : 4 ,name : 'Laravel'       , img : IMAGES.laravel},
]

const RoomScreen = () => {
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      const result = userModel.disconnect()
      return () => {
        result
      }
    }, [])
  );


  const goChatRoom = (item) => {
    navigation.navigate('ChatScreen',{
      id : item.id,
      name : item.name 
    })
  }

  const showItem = ({item}) => {
      return (
        <TouchableOpacity onPress={() => goChatRoom(item)} style={styles.roomContainer}>
          <View style={styles.roomBox}>
            <View style={styles.boxImg}>
              <Image  style={styles.img} source={item.img} />
            </View>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )
  }
    
  return (
    <>
      <StatusBar hidden={true} />
      <FlatList 
        data={data}
        numColumns={2}
        renderItem={showItem}
        key={(item) => item.id.toString()}
      />
    </>
  )
}

export default RoomScreen
