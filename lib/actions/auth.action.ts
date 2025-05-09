"use server";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";
//import { auth } from "firebase-admin";

const ONE_WEEK =  60 * 60 * 24 * 7;
export async function signup(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "Email already exists, please Sign in",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account Created successfully ! 😊👌",
    };
  } catch (error: any) {
    console.log(`error in creating a usr ${error}`);
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: "Failed to create user ! 😶",
    };
  }
}
// @ts-ignore
export async function setSessionCookies(idToken: string) {
  const cookieStore = await cookies();

  // @ts-ignore
  const sessioncookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  //console.log("session cookie", sessioncookie);
  
  
  cookieStore.set("session", sessioncookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  console.log("session cookie set successfully", sessioncookie);
  
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    // @ts-ignore
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User Doesn't exists, please Sign up",
      };
    }
   // console.log(email,idToken);
    
    await setSessionCookies(idToken);
  } catch (e) {
    console.log(`error in signin a usr ${e}`);
    return {
      success: false,
      message: "Failed to log in !",
    };
  }
}

export async function getCurrentUser(): Promise<User|null> {
          const cookieStore = await cookies();

          const sessionCookie = cookieStore.get("session")?.value;
          console.log(sessionCookie)
          if(!sessionCookie){
            return null;
          }

          try{
             const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
             const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
              if(!userRecord.exists){
                  return null;
              }

              return{
                ...userRecord.data(),
                id: userRecord.id,
              } as User;
          }catch(e){
            console.log(e)
            return null;
          }
}

export async function isAuthenticated(){
         const user = await getCurrentUser();

         return !!user;   //by this we can make it in a boolean form
} 


export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
       const Interviews = await db
                 .collection('interviews')
                 .where('userId', '==', userId)
                 .orderBy('createdAt', 'desc')
                 .get();

     return Interviews.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     })) as Interview[];           

} 