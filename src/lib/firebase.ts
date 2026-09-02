import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  Firestore,
  Unsubscribe
} from 'firebase/firestore';
import { getAuth, signInAnonymously, Auth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { StudentProfile } from '../types';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  // Initialize Firestore with configured databaseId if provided
  if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)') {
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    db = getFirestore(app);
  }

  auth = getAuth(app);
  // Transparent anonymous sign in to ensure connection
  signInAnonymously(auth).catch((err) => {
    console.warn('Anonymous auth sign-in notice (non-fatal):', err);
  });
} catch (e) {
  console.error('Firebase initialization error:', e);
}

export { db, auth };

const COLLECTION_NAME = 'students';

/**
 * Save or submit a student profile to Firestore
 */
export async function saveProfileToFirestore(profile: StudentProfile): Promise<string> {
  if (!db) throw new Error('Cơ sở dữ liệu Firebase chưa được kết nối.');
  
  // Use existing ID or generate timestamp-based ID
  const docId = profile.id && profile.id.startsWith('hs-') 
    ? profile.id 
    : `hs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  const docRef = doc(db, COLLECTION_NAME, docId);
  
  const cleanProfile: StudentProfile = {
    ...profile,
    id: docId,
    updatedAt: new Date().toISOString(),
    createdAt: profile.createdAt || new Date().toISOString(),
  };

  // Convert undefined values to empty strings to avoid Firestore rejection
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(cleanProfile)) {
    if (value === undefined) {
      sanitized[key] = '';
    } else {
      sanitized[key] = value;
    }
  }

  await setDoc(docRef, sanitized, { merge: true });
  return docId;
}

/**
 * Real-time listener for all submitted student profiles
 */
export function subscribeToOnlineProfiles(
  onData: (profiles: StudentProfile[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    console.warn('Firestore not ready for subscription');
    return () => {};
  }

  const colRef = collection(db, COLLECTION_NAME);
  // Real-time snapshot
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: StudentProfile[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as StudentProfile;
        list.push({
          ...data,
          id: docSnap.id
        });
      });
      // Sort by updatedAt or createdAt desc (newest first)
      list.sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });
      onData(list);
    },
    (err) => {
      console.error('Firestore onSnapshot error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Delete a profile from Firestore
 */
export async function deleteProfileFromFirestore(docId: string): Promise<void> {
  if (!db) throw new Error('Cơ sở dữ liệu Firebase chưa được kết nối.');
  const docRef = doc(db, COLLECTION_NAME, docId);
  await deleteDoc(docRef);
}

/**
 * Get a single profile by docId
 */
export async function getProfileFromFirestore(docId: string): Promise<StudentProfile | null> {
  if (!db) return null;
  const docRef = doc(db, COLLECTION_NAME, docId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { ...(snap.data() as StudentProfile), id: snap.id };
  }
  return null;
}
