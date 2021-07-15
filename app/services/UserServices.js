import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const userRef = firestore.collection('users')


export const addUser = async (body) => {
    const snapshot = await userRef.where('email', '==', body.email).get();
    if (snapshot.empty) {
        await userRef.add(body);

        const snapshot = await userRef.where('email', '==', body.email).get();
        if (snapshot.empty) {
            return false;
        }

        let res = {}
        snapshot.forEach(doc => {
            res = doc.data()
            res.docId = doc.id
        });

        return res;
    }
    return false;
}

export const loginUser = async (email, password) => {
    const snapshot = await userRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {
        return false;
    }

    let res = {}
    snapshot.forEach(doc => {
        res = doc.data()
        res.docId = doc.id
    });

    return res;

}

export const addUserId = async (body) => {
    const snapshot = await userRef.where('id', '==', body.id).get();
    if (snapshot.empty) {
        return await userRef.add(body);
    }
    return false;
}


export const getUserById = async (id) => {
    const snapshot = await userRef.where('id', '==', id).get();
    if (snapshot.empty) {
        return false;
    }

    let res = {}
    snapshot.forEach(doc => {
        res = doc.data()
        res.docId = doc.id
    });

    return res;
}

export const getUserRef = () => {
    return userRef;
}

export const updateUser = async (id, body) => {
    try {

        const snapshot2 = await userRef.where('id', '==', id).get();
        if (snapshot2.empty) {
            return false;
        }

        let docId = ''
        snapshot2.forEach(doc => {
            docId = doc.id
        });

        await userRef.doc(docId).update(body)
        const newRs = await getUserById(id)
        if (newRs) {
            return newRs;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
}
