import { getDocs, addDoc, collection, query, where, serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

async function findUserByEmail(db, email) {
    const q = query(collection(db, "users"), where("email", "==", email.toLowerCase()));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() };
}

export async function registerUser(db, { firstName, lastName, email, password }) {
    const existing = await findUserByEmail(db, email);
    if (existing) throw new Error("Email already registered");
    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS); // sync
    await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        email: email.toLowerCase(),
        passwordHash,
        createdAt: serverTimestamp(),
    });
}

export async function loginUser(db, { email, password }) {
    const user = await findUserByEmail(db, email);
    if (!user) throw new Error("Invalid email or password");
    const ok = bcrypt.compareSync(password, user.passwordHash); // sync
    if (!ok) throw new Error("Invalid email or password");
    const { passwordHash, ...safe } = user;
    return safe;
}
