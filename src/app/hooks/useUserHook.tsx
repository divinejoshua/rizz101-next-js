import { useEffect, useState } from "react";
import IUser from "@/app/interface/user.interface";
import firebase from '../firebase/firebase';
import {
    doc,
    onSnapshot,
    setDoc,
    collection,
    query,
    where,
  } from 'firebase/firestore';

const useUser = (user : any) => {

    // STATES
    const colletionRef = collection(firebase, 'users');
    const [recieverUserDetails, setrecieverUserDetails] = useState<IUser>({})

    // This is findUserById and Then create a new user if it doesn't exist
    const findUserById = async (user :any) : Promise<void> =>{

        // Query Statement
        const queryClause = query(
            colletionRef,
            where('id', '==', user.uid),
        );
        let userData : any = {}

        // Get user details from database
        onSnapshot(queryClause, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userData = doc.data()
            });

              // Create user if non exist
              if(!userData.id){
                createNewUser(user)
            }
        });
        return
    }

    const createNewUser = async (user : any) =>{
        let newUser : IUser = {
            id: user.uid,
            email : user.email,
            fullname : user.displayName,
            authProvider : user.photoURL
        };

        try {
            const userRef = doc(colletionRef, newUser.id);
            await setDoc(userRef, newUser);
            } catch (error) {
            console.error(error);
        }
        return
    }

    // This function only returns user details if user exist
    const getUserById = (userId: string) : IUser =>{

        let userData : IUser = {}

        // Query Statement
        const queryClause = query(
            colletionRef,
            where('id', '==', userId),
        );

        // Get user details from database
        onSnapshot(queryClause, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userData = doc.data()
                setrecieverUserDetails(doc.data())
            });

        });
        return userData
    }

    return { findUserById, createNewUser, getUserById, recieverUserDetails };
}

export default useUser;