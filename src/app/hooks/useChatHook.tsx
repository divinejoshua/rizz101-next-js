import { getFirestore } from "firebase-admin/firestore"
import { v4 as uuidv4 } from 'uuid';
import { initAdmin } from "../firebase/firebaseAdmin";

const useChat = () => {

    initAdmin()

    //Save chat
    const saveChatToDb = async (messageSent : string, aiResponse: string, threadId : string) => {
        // Get the `FieldValue` object
        var FieldValue = require("firebase-admin").firestore.FieldValue;

        let response : any = {}
        const messageId = uuidv4() //Generate new message id
        const firestore = getFirestore()
        await firestore.collection('messages').doc(messageId).set({
            id : messageId,
            messageSent : messageSent,
            aiResponse : aiResponse,
            threadId : threadId,
            createdAt : FieldValue.serverTimestamp(),
          }).then(() => {
            response = messageId
          }).catch((error) => {
            console.error('Error saving message: ', error);
          });

          return response
      }


    return { saveChatToDb };
}

export default useChat;