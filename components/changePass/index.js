import React , { useState } from 'react'
import { View } from 'react-native'
import Dialog from "react-native-dialog";
import InputDialog from '../inputDialog'
import { userModel } from '../../model'

const ChangePassForm = ({visible,setVisible}) => {

    const [oldPassword, setOldPassword]                 = useState('')
    const [newPassword, setNewPassword]                 = useState('')
    const [confirmPassword, setConfirmPassword]         = useState('')

    const handleCancel = () => {
        setVisible(false)
    }

    const handleChange = () => {
        userModel.changePass(oldPassword,newPassword,confirmPassword)
        setVisible(false)
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    return (
        <View>
            <Dialog.Container visible={visible}>
            <Dialog.Title>Change Password</Dialog.Title>
            <Dialog.Description>
                Do you want to change Password?
            </Dialog.Description>
            <View>
                <InputDialog name={'Old Password'} value={oldPassword} onChange={(value) => setOldPassword(value)} />
            </View>
            <View>
                <InputDialog name={'New Password'} value={newPassword} onChange={(value) => setNewPassword(value)} />
            </View>
            <View>
                <InputDialog name={'Confirm Password'} value={confirmPassword} onChange={(value) => setConfirmPassword(value)} />
            </View>
            <Dialog.Button onPress={handleCancel} label="Cancel" />
            <Dialog.Button onPress={handleChange} label="Change" />
            </Dialog.Container>
        </View>
    )
}

export default ChangePassForm
