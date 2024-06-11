import { Timestamp } from "firebase/firestore";

interface IUser {
    id?                 : string,
    email?              : string,
    fullname?           : string,
    authProvider?       : string,
    isSubscribed?       : boolean,
    lastPaymentDate?    : Timestamp
}

export default IUser;