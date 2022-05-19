import { firebase , auth , database } from '../firebase'
import showNotice from '../lib/showNotice'
import { MESSAGE } from '../contains'

const userModel = {
    changePass : async (oldPass,newPass,confirmPass) => {
        if( newPass !==  confirmPass){
            showNotice(MESSAGE.passwordConfirm,true)
        }else {
            var cred = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email,oldPass);
            auth.currentUser.reauthenticateWithCredential(cred)
            .then( async () => {
                try {
                    await auth.currentUser.updatePassword(newPass)
                    showNotice(MESSAGE.updateSuccess)
                } catch (error) {
                    showNotice(error.message,true)
                }
            })
            .catch((error) => {
                showNotice(error.message,true)
            })
        }
    },
    uploadImage : async ({nameFull,blob,setPhoto,setLoading}) => {

        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/' + nameFull).put(blob, metadata);
        
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                setLoading(progress)
            }, 
            (error) => {
                showNotice(error.message,true)
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then( async (downloadURL) => {
                    await auth.currentUser.updateProfile({
                        photoURL : downloadURL
                    }).then( () => {
                        showNotice(MESSAGE.updateSuccess)
                        setPhoto(downloadURL)
                    }).catch( (error) => {
                        showNotice(error.message,true)
                    })
                });
            }
            );

    },
    connect : async (collectionName) => {
        var uid = auth.currentUser.uid;
        var name = auth.currentUser.displayName;
        var img = auth.currentUser.photoURL;
        var userStatusDatabaseRef = database.ref('/status/' + uid);
        var isOfflineForDatabase = {
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
        var isOnlineForDatabase = {
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
            room : collectionName,
            name : name,
            img : img
        };
        database.ref('.info/connected').on('value', function(snapshot) {
            // If we're not currently connected, don't do anything.
            if (snapshot.val() == false) {
                return;
            };
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
    },
    disconnect : async () => {
        var uid = auth.currentUser.uid;
        var userStatusDatabaseRef = database.ref('/status/' + uid);
        userStatusDatabaseRef.remove()
        return
    },
    listUserOnl : async (roomName,setData) => {
        var listUser = database.ref('status');
        let arr = [];
        listUser.on('value', (snapshot) => {
            snapshot.forEach((user) => {
                if( user.val().room == roomName && user.val().state == 'online'){
                    arr = [
                        ...arr,
                        {
                            id      : user.val().name.toString() + user.val().last_changed.toString(),
                            name    : user.val().name,
                            img     : user.val().img,
                        }
                    ]
                }
            })
            setData(arr)
            listUser.off('value')
        });

    }
}

export default userModel