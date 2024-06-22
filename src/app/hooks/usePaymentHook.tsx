import { getFirestore } from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';
import { initAdmin } from "../firebase/firebaseAdmin";
import { PAYMENTS_FIREBASE_TABLE } from "../constants/constants";

const usePayment = () => {

    initAdmin()

    //Table

    //Save chat
    const saveTransactionEvent = async (paymentDetails : any) => {
        // Get the `FieldValue` object
        var FieldValue = require("firebase-admin").firestore.FieldValue;

        let response : any = {}
        const paymentId = uuidv4() //Generate new payment id
        const firestore = getFirestore()
        await firestore.collection(PAYMENTS_FIREBASE_TABLE).doc(paymentId).set({
            id : paymentId,
            paymentDetails : paymentDetails,
            createdAt : FieldValue.serverTimestamp(),
          }).then(() => {
            response = paymentId
          }).catch((error) => {
            console.error('Error saving transaction: ', error);
          });

          return response
      }


    return { saveTransactionEvent };
}

export default usePayment;