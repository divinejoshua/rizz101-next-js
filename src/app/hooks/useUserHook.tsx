import IUser from "@/app/interface/user.interface";
import { getFirestore } from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';
import { initAdmin } from "../firebase/firebaseAdmin";
import { USERS_FIREBASE_TABLE } from "../constants/constants";

const useUser = () => {


    // This is findUserById and Then create a new user if it doesn't exist
    const getOrCreateUser = async (user :IUser) =>{
        initAdmin()
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
        initAdmin()
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
        initAdmin()
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


    // Function to update user's isSubscribed field to true
    const updateUserSubscription = async (email : string, subscribeValue : boolean) => {
        initAdmin()
        if (!email) { throw ("Email is missing") }
        const firestore = getFirestore();
        const usersRef = firestore.collection(USERS_FIREBASE_TABLE);
        const snapshot = await usersRef.where('email', '==', email).get();

        if (snapshot.empty) {
            throw ("User not found");
        }

        let userId = null;
        snapshot.forEach(existingUserDoc => {
            userId = existingUserDoc.id;
        });

        if (userId) {
            await usersRef.doc(userId).update({ isSubscribed: subscribeValue });
            const updatedUserSnapshot = await usersRef.doc(userId).get();
            return updatedUserSnapshot.data();
        } else {
            throw ("User Id not found");
        }
    }

    return { getOrCreateUser, createNewUser, getUserById, updateUserSubscription };
}

export default useUser;