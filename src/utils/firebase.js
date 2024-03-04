// @ts-ignore 
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, getReactNativePersistence, signInWithEmailAndPassword, initializeAuth } from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {doc, getDoc, getFirestore, setDoc, getDocs, collection, query, where, onSnapshot, addDoc, orderBy, collectionGroup, } from 'firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6rDqFbvobVJL-RuUiRhd0zL3EtzqsPi0",
    authDomain: "chatapp-6131e.firebaseapp.com",
    databaseURL: "https://chatapp-6131e-default-rtdb.firebaseio.com",
    projectId: "chatapp-6131e",
    storageBucket: "chatapp-6131e.appspot.com",
    messagingSenderId: "117924893445",
    appId: "1:117924893445:web:451643480c022d05de9d6c",
    measurementId: "G-HEQS56NX76"
  };


  const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

  const db = getFirestore();
  

  const uploadImageToStorage = async (fileUrl, userId) => {
    try {
        // Get reference to the storage service
        const storage = getStorage();
        const fileExtension = fileUrl.split('.').pop();
        // Create a reference to the storage location with custom filename
        const imageRef = ref(storage, `profiles/${userId}.${fileExtension}`);

        // Fetch the image file data
        const response = await fetch(fileUrl);
        const fileData = await response.blob();

        // Upload file data to the storage reference
        const snapshot = await uploadBytes(imageRef, fileData);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

  export const checkIfUserIsLoggedIn = async () => {
    try {
        // Check if user credentials are stored locally
        const email = await AsyncStorage.getItem('userEmail');
        const password = await AsyncStorage.getItem('userPassword');
        const service = await AsyncStorage.getItem('service');
        if (email && password) {
            // Attempt to sign in with stored credentials
            const userCredential = await signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const userRef=doc(db, service, user.uid);
            const userInfo = await getDoc(userRef)
            console.log(userInfo)
            return userInfo.data();
        } else {
            console.log('No stored credentials found.');
        }
    } catch (error) {
        console.error('Error checking user login status:', error);
    }
};


  export const CustomerSignup = async (email, password, object) => {
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log('User signed up:', user.uid);
          const imageUrl = await uploadImageToStorage(object.imageUri, user.uid);
          object.imageUri = imageUrl
          await setDoc(doc(db, "Customers", user.uid), object);
          return user;
      } catch (error) {
          console.error('Sign up error:', error);
          throw error;
      }
  };
  export const ProviderSignup = async (email, password, object) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user.uid);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userPassword", password);
        await AsyncStorage.setItem("service", object.service);
        const imageUrl = await uploadImageToStorage(object.imageUri, user.uid);
        object.imageUri = imageUrl
        await setDoc(doc(db, "Providers", user.uid), object);
        const userRef = doc(db, "Providers", user.uid);
        const userInfo = await getDoc(userRef)
        return userInfo.data();
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
};
  
  export const onSigninPress = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef=doc(db, "Customers", user.uid);
        const userInfoRef = await getDoc(userRef)
        const userInfo = userInfoRef.data()
        const userData = {...userInfo,id: user.uid}
        return userData;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export const loginProvider = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef=doc(db, "Providers", user.uid);
        const userInfoRef = await getDoc(userRef);
        const userInfo = userInfoRef.data();
        const userData = {...userInfo, id: user.uid}
        return userData;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export async function getDocumentsByService(service) {
    const providerRef = collection(db, 'Providers');
    const q = query(providerRef, where('service', '==', service));

    try {
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, data: doc.data() });
        });
        return documents;
    } catch (error) {
        console.error('Error getting documents: ', error);
        throw error;
    }
}

export const useChatMessages = (customerId, providerId) => {
    const [messages, setMessages] = useState([]);
    const [chatroomId, setChatroomId] = useState('');

    useEffect(() => {
        if (customerId && providerId) {
            const id = `${customerId}_${providerId}`;
            setChatroomId(id);

            const unsubscribe = onSnapshot(query(collection(db, `messages/${id}/messages`), orderBy('createdAt', 'desc')), (snapshot) => {
                const messageData = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const createdAt = data.createdAt.toDate(); // Convert Firestore Timestamp to JavaScript Date object
                    const message = { _id: doc.id, ...data, createdAt, user: { _id: data.senderId } }; // Include user property
                    messageData.push(message);
                });
                // Sort messages by createdAt in descending order
                messageData.sort((a, b) => b.createdAt - a.createdAt);
                setMessages(messageData);
            });

            return () => unsubscribe();
        }
    }, [customerId, providerId]);

    const sendMessage = async (senderId, receiverId, text) => {
        try {
            if (customerId && providerId) {
                await addDoc(collection(db, `messages/${chatroomId}/messages`), {
                    senderId,
                    receiverId,
                    text,
                    createdAt: new Date() // Use JavaScript Date object for createdAt
                });
            } else {
                console.error('customerId and/or providerId is undefined');
            }
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return { messages, sendMessage };
};

export async function getConversationsByUser(userId) {
    try {
        const conversations = [];
        const q = query(collectionGroup(db, 'messages'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.receiverId === userId || data.senderId === userId) {
                conversations.push({ id: doc.id, ...data });
            }
        });
        return conversations;
    } catch (error) {
        console.error('Error getting conversations by user: ', error);
        throw error;
    }
}

export async function createOrder(orderData) {
    try {
        // Add the order to the "orders" collection
        const docRef = await addDoc(collection(db, 'orders'), orderData);
        console.log('Order created with ID: ', docRef.id);
        return docRef.id; // Return the ID of the newly created order document
    } catch (error) {
        console.error('Error creating order: ', error);
        throw error;
    }
}

export async function getOrdersByStatus() {
    try {
        const ordersByStatus = {
            pending: {},
            completed: {},
            awaiting: {},
            confirmed: {}
        };

        // Create a query using collectionGroup to query all collections
        const q = query(collectionGroup(db, 'orders'));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const order = doc.data();
            console.log(doc.id)
            const status = order.status;

            if (order.bookingDate) {
                order.bookingDate = order.bookingDate.toDate();
                order.id = doc.id
            }

            // Categorize the order based on its status
            if (status === 'pending') {
                ordersByStatus.pending[doc.id] = order;
            } else if (status === 'completed') {
                ordersByStatus.completed[doc.id] = order;
            } else if (status === 'cancelled') {
                ordersByStatus.awaiting[doc.id] = order;
            } else if (status === 'confirmed') {
                ordersByStatus.confirmed[doc.id] = order;
            }
        });

        return ordersByStatus;
    } catch (error) {
        console.error('Error getting orders by status: ', error);
        throw error;
    }
}
export async function getOrdersByStatusAndUser(userId) {
    try {
        const ordersByStatus = {
            pending: {},
            completed: {},
            awaiting: {},
            confirmed: {}
        };

        // Create a query using collectionGroup to query all collections
        const q = query(collectionGroup(db, 'orders'));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            const order = doc.data();
            const status = order.status;
            const providerId = order.providerId;
            const id = doc.id;
            order.id=id;

            // Convert createdAt and bookingDate from Timestamp to JavaScript Date object
            if (order.createdAt) {
                order.createdAt = order.createdAt.toDate();
            }
            if (order.bookingDate) {
                order.bookingDate = order.bookingDate.toDate();
            }

            // Check if the order belongs to the specified user
            if (providerId === userId) {
                // Categorize the order based on its status
                if (status === 'pending') {
                    ordersByStatus.pending[doc.id] = order;
                } else if (status === 'completed') {
                    ordersByStatus.completed[doc.id] = order;
                } else if (status === 'cancelled') {
                    ordersByStatus.awaiting[doc.id] = order;
                } else if (status === 'confirmed') {
                    ordersByStatus.confirmed[doc.id] = order;
                }
            }
        });

        return ordersByStatus;
    } catch (error) {
        console.error('Error getting orders by status and user: ', error);
        throw error;
    }
}
