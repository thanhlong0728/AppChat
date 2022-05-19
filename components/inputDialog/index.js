import React , { useState } from 'react'
import { TextInput, Text , View } from 'react-native'
import IconStyle from '../icon'
import Dialog from "react-native-dialog";

import styles from './styles'

const InputDialog = ({name,style,editable = true,value,onChange}) => {
    const [showPass, setShowPass]  = useState(false)

    let obj = { 
        name            : name,  
        placeholder     : `${name}...`, 
        autoCapitalize  : 'none', 
        style           : {...style},
        editable        : editable,
        secureTextEntry : showPass,
        icon            : <></>
    }

    switch (name) {
        case 'Old Password' :
        case 'New Password' :
        case 'Confirm Password':
            obj.secureTextEntry = !showPass
            obj.icon = <IconStyle name={showPass ? 'eye-slash' : 'eye'}  onPress={() =>setShowPass(!showPass)}/>
            break;
        default:
            break;
    }

    return (
        <>
            <Dialog.Input 
                placeholder={obj.placeholder}
                autoCapitalize={obj.autoCapitalize} 
                style={[styles.textInput,obj.style]}
                editable={obj.editable}
                secureTextEntry={obj.secureTextEntry}
                value={value}
                onChangeText={(value) => onChange(value)}
            />
            <View style={styles.iconShowPass}>{obj.icon}</View>
        </>
    )
}

export default InputDialog
