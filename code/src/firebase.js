// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc, collection } from "firebase/firestore"; // Updated import
import { addDoc, getDocs, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
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

export async function FireWriteDoc(coll, docData) {
    try {
        // Get the first element of the doc object as the document ID
        const docId = Object.values(docData)[0]; // Assuming the first element is the unique ID

        // Use setDoc to explicitly set the document ID
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
            .filter((doc) => doc.id !== "titles") // Skip the document with ID "titles"
            .map((doc) => ({
                id: doc.id, // Include the document ID
                ...doc.data(), // Spread the document data
            }));
        console.log("Documents retrieved (excluding 'titles'): ", documents);
        return documents; // Return the array of documents
    } catch (error) {
        console.error("Error reading collection: ", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export async function fireWriteCollection(coll, docs) {
    try {
        const writeResults = [];

        for (const docData of docs) {
            // Get the first element of the doc object as the document ID
            const docId = Object.values(docData)[0]; // Assuming the first element is the unique ID

            // Skip the document with ID "titles"
            if (docId === "titles") {
                console.log("Skipping document with ID 'titles'");
                continue;
            }

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
}
