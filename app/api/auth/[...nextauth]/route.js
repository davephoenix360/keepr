import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { session } from "@/app/lib/session";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const saveUser = async (user) => {
  try {
    const docRef = doc(firestore, "users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        name: user.name,
      });
    } else {
      await setDoc(docRef, {
        ...user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("Profile not found");
      } else {
        await saveUser(profile);
        return true;
      }
    },

    session,

    async jwt({ token, user, account, profile }) {
      if (profile) {
          const docRef = doc(firestore, "users", user.email);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            throw new Error("User not found");
          }
          token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
