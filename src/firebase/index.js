import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCu8vfg06p1xCRL56VTIV3ikANv1Gy9KlE",
  authDomain: "wf3-e-commerce.firebaseapp.com",
  projectId: "wf3-e-commerce",
  storageBucket: "wf3-e-commerce.appspot.com",
  messagingSenderId: "975820579353",
  appId: "1:975820579353:web:3f5cbe7dedda39b3780088"

})

const auth = firebase.auth()
const db = firebase.firestore()

// AUTHENTIFICATION

const loginWithGoogle = async (history) => {
  const provider = new firebase.auth.GoogleAuthProvider()

  try {
    const result = await auth.signInWithPopup(provider)
    const {additionalUserInfo} = result
    const {email, uid} = result.user

    await db.collection('users').doc(uid).set({
      firstname: additionalUserInfo.profile.family_name,
      lastname: additionalUserInfo.profile.given_name,
      id: uid,
      email
    })

    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

const register = async user => {
  const { firstname, lastname, email, password, admin } = user
  try {
    await auth.createUserWithEmailAndPassword(email, password)
    await db.collection('users').add({firstname, lastname, email, admin})
  } catch (error) {
    console.error(error)
  }
}

const login = async user => {
  try {
    await auth.signInWithEmailAndPassword(user.email, user.password)
  } catch (error) {
    console.error(error.message)
  }
}

// DATABASE

const getItems = async () => {
  const list = []
  try {
    const result = await db.collection('items').get()
    result.forEach(doc => list.push(doc.data()))
    return list
  } catch (error) {
    console.error(error.message)
  }
}

export { register, loginWithGoogle, login, auth, getItems, db }
