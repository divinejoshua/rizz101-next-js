import IUser from "@/app/interface/user.interface";
import { getFirestore } from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';
import { initAdmin } from "../firebase/firebaseAdmin";
import { USERS_FIREBASE_TABLE } from "../constants/constants";

const useUser = () => {

    initAdmin()

    // This is findUserById and Then create a new user if it doesn't exist
    const getOrCreateUser = async (user :IUser) =>{
        if(!user.email) {throw("Email is missing")}
        let response = null
        const firestore = getFirestore()
        const usersRef = firestore.collection(USERS_FIREBASE_TABLE);
        const snapshot = await usersRef.where('email', '==', user.email).get();

        //if user not found, create new user and get new details
        if (snapshot.empty) {
            let newUserId = await createNewUser(user)
            const newUserSnapshot = await firestore.collection(USERS_FIREBASE_TABLE).doc(newUserId).get()
            response = newUserSnapshot.data()
        } else {
            snapshot.forEach(existingUserDoc => {
                response = existingUserDoc.data()
            });
        }

        // Return the user
        return response
    }

    //Create new user
    const createNewUser = async (user : IUser) => {
        if(!user.email) {throw("Email is missing")}

        let response : any = {}
        const userId = uuidv4() //Generate new user id
        const firestore = getFirestore()
        await firestore.collection(USERS_FIREBASE_TABLE).doc(userId).set({
            id : userId,
            email: user.email,
            name: user.name,
            authProvider: user.authProvider,
            isSubscribed: false,
          }).then(() => {
            response = userId
          }).catch((error) => {
            console.error('Error registering user: ', error);
          });

        // Return the user
          return response
      }


    // This function only returns user details if user exist
    const getUserById = async (userId: string) =>{
        if(!userId) {throw("UserId is missing")}
        let response = null
        const firestore = getFirestore()
        const usersRef = firestore.collection(USERS_FIREBASE_TABLE);
        const snapshot = await usersRef.where('id', '==', userId).get();

        //if user not found, create new user and get new details
        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                response = doc.data()
            });
        } 
        // Return the user
        return response
    }

    return { getOrCreateUser, createNewUser, getUserById };
}

export default useUser;