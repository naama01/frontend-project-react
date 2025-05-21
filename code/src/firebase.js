import { initializeApp } from "firebase/app";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { setDoc, doc, collection } from "firebase/firestore"; // Updated import
import { addDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { query as firestoreQuery, where, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBct_RWeiaFjNjJGlrp0mgnwj-cqgLxXnQ",
    authDomain: "miznono-dfdc3.firebaseapp.com",
    projectId: "miznono-dfdc3",
    storageBucket: "miznono-dfdc3.firebasestorage.app",
    messagingSenderId: "465662412173",
    appId: "1:465662412173:web:b221d652bf2dff514869c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

//delay to make the loading message more visible
export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function FireWriteDoc(coll, docData, docId) {
    try {
        await sleep(500); // Half-second delay to make the loading message more visible for class demo

        // Get the first element of the doc object as the document ID
      //  const docId = Object.values(docData)[0]; // First element is the unique ID

        // Use setDoc to explicitly set the document ID
        if (!docId) {docId = Object.values(docData)[0]}
        const docRef = doc(firestore, coll, docId);
        await setDoc(docRef, docData);

        console.log("Document written with ID: ", docId);

        return docId; // Return the document ID on success
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Re-throw the error to handle it in the calling function
    }

}

export async function fireReadCollection(coll) {
    try {
        const querySnapshot = await getDocs(collection(firestore, coll));
        const documents = querySnapshot.docs
            .map((doc) => ({
                id: doc.id, // Include the document ID
                ...doc.data(), // Spread the document data
            }));
        console.log("Documents retrieved: ", documents);
        await sleep(500); // Half-second delay to make the loading message more visible

        return documents; // Return the array of documents
    } catch (error) {
        console.error("Error reading collection: ", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export async function fireReadDoc(coll, DocId) {
    try {
        // Reference the document with ID "titles" in the specified collection
        const docRef = doc(firestore, coll, DocId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const document = { ...docSnap.data() }; // Include the document ID and data
            console.log("Document retrieved: ", document);
            return document; // Return the document
        } else {
            console.log("No such document ID!");
            return null; // Return null if the document does not exist
        }
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }

}


export async function fireWriteCollection(coll, docs) {
    try {
        await sleep(500); // Half-second delay to make the loading message more visible

        const writeResults = [];

        for (const docData of docs) {
            // Get the first element of the doc object as the document ID
            const docId = Object.values(docData)[0]; // Assuming the first element is the unique ID


            // Use setDoc to explicitly set the document ID
            const docRef = doc(firestore, coll, docId);
            await setDoc(docRef, docData);

            console.log(`Document written with ID: ${docId}`);
            writeResults.push(docId); // Collect the document ID on success
        }

        return writeResults; // Return an array of document IDs
    } catch (error) {
        console.error("Error writing collection:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}


export async function fireReadTitles(dataname) {
    try {
        // Reference the document with ID "titles" in the specified collection
        const docRef = doc(firestore, "titles", dataname);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const document = Object.entries(docSnap.data())
                .sort(([keyA], [keyB]) => keyA - keyB) // Sort by field names (keys)
                .map(([, value]) => value); // Extract and return the values in order

            console.log("Field values ordered by field names: ", document);
            return document; // Return the ordered field values
        } else {
            console.log("No such document with ID 'titles'!");
            return null; // Return null if the document does not exist
        }
    } catch (error) {
        console.error("Error reading document with ID 'titles':", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

/*

*/

/*

export async function fireReadTitles(coll) {
    try {
        // Reference the document with ID "titles" in the specified collection
        const docRef = doc(firestore, coll, "titles");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const document = { ...docSnap.data() }; // Include the document ID and data
            console.log("Titles retrieved: ", document);
            return document; // Return the document
        } else {
            console.log("No such document with ID 'titles'!");
            return null; // Return null if the document does not exist
        }
    } catch (error) {
        console.error("Error reading document with ID 'titles':", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}ֿ

*/

export async function fireDeleteDoc(coll, docId) {
    try {
        // Reference the document to delete
        await sleep(500); // Half-second delay to make the loading message more visible

        const docRef = doc(firestore, coll, docId);
        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", docId);
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export async function fireUpdateDocument(coll, id, data) {
    try {
        await sleep(500); // Half-second delay to make the loading message more visible

        const docRef = doc(firestore, coll, id);
        await updateDoc(docRef, data);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

export async function fireReadQuery(coll, queryCondition, options = {}) {
    try {

        const collRef = collection(firestore, coll);

        // Basic query
        let firestoreQueryRef = firestoreQuery(collRef, where(...queryCondition));

        // Apply optional orderBy and limit
        if (options.orderBy) {
            const [field, direction] = options.orderBy;
            firestoreQueryRef = firestoreQuery(firestoreQueryRef, orderBy(field, direction));
        }
        if (options.limit) {
            firestoreQueryRef = firestoreQuery(firestoreQueryRef, limit(options.limit));
        }

        const querySnapshot = await getDocs(firestoreQueryRef);

        // Return simplified array of documents
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error reading collection with query:", error);
        throw error;
    }

}


export async function fireReadEnabledOnly(coll) {
    try {

        // Reference the collection
        const collRef = collection(firestore, coll);

        // Hardcoded query to filter documents where "פעיל" is true
        const firestoreQueryRef = firestoreQuery(collRef, where('פעיל', "==", true));

        // Execute the query
        const querySnapshot = await getDocs(firestoreQueryRef);

        // Map the results to an array of documents
        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        console.log("Documents retrieved with פעיל set to true: ", documents);
        return documents; // Return the array of documents
    } catch (error) {
        console.error("Error reading collection with פעיל set to true: ", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export { FireWriteDoc as fireWriteDoc }; // Ensure proper export