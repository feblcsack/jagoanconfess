
import { db } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const sendMessage = async (recipient, message, song) => {
  try {
    await addDoc(collection(db, 'messages'), {
      recipient,
      message,
      song,
      timestamp: serverTimestamp()
    });
    console.log("Pesan berhasil dikirim!");
  } catch (error) {
    console.error("Gagal mengirim pesan: ", error);
  }
};
