import { useNavigation } from '@react-navigation/native'
import React , { createContext , useState , useContext } from 'react'
import { auth } from '../firebase'
import { showNotice } from '../lib'
import { MESSAGE } from '../contains'

// 1 . Khởi tạo object context
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const navigation                = useNavigation()
    const [user, setUser]           = useState(null)
    const [loading, setLoading]     = useState(false)


    return (

        <AuthContext.Provider 
            value={{
                user,
                loading,
                login : async ( email , password ) => {
                    setLoading(true)

                    await auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                      var user = userCredential.user;
                      setUser(user)
                      showNotice('Welcome ZendVN App Chat')
                    })
                    .catch((error) => {
                        showNotice(error.message,true)
                    });

                    setLoading(false)
                },
                register : async ( email , password ) => {
                    setLoading(true)

                    await auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                      // Signed in 
                      userCredential.user.updateProfile({
                        displayName: email,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/rn-app-05.appspot.com/o/default%2Favatar_default.png?alt=media&token=35172c74-fcc4-4227-8c03-81f366d22fa5"
                      }).then(() => {
                        navigation.navigate('Login')
                        showNotice(MESSAGE.registerSuccess)
                      }).catch((error) => {
                        showNotice(error.message,true)
                      });
                    })
                    .catch((error) => {
                      showNotice(error.message,true)
                    });

                    setLoading(false)
                },
                logout :  async () => {
                  setLoading(true)
                  await auth.signOut().then(() => {
                      setUser(null)
                    }).catch((error) => {
                      showNotice(error.message,true)
                    });
                  setLoading(false)
                },
                updateInfo : async (displayName) => {
                  setLoading(true)

                  await auth.currentUser.updateProfile({
                      displayName : displayName
                  }).then( () => {
                    showNotice(MESSAGE.updateSuccess)
                  }).catch( (error) => {
                    showNotice(error.message,true)
                  })

                  setLoading(false)
                }
            }}
            >
        {children}
        </AuthContext.Provider>
    )
}




