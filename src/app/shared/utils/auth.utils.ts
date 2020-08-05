/**
 * Utils class for Authentication related
 */
import { FirebasePromiseError } from '../models/firebase.model';
import { throwError } from 'rxjs';
import { SnapshotAction } from '@angular/fire/database';

const baseSignInWithPasswordUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
const baseSignUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";


export function getFirebaseErrorMsg(err: FirebasePromiseError): string {
  if (err) {
    return decodeFireBaseErr(err);
  }
  return "Server error occured, but could not get a detailed message from backend."
}

/**
 * Full list: https://firebase.google.com/docs/auth/admin/errors
 *
 * @param err
 */
function decodeFireBaseErr(err: FirebasePromiseError): string {
  let errMsg: string = "Server error occured."
  switch (err.code) {
    case "auth/email-already-in-use": {
      errMsg = "Email already exists.";
      break;
    }
    case "auth/invalid-email": {
      errMsg = "Email is invalid.";
      break;
    }
    case "auth/operation-not-allowed": {
      errMsg = "This operation is currently not allowed.";
      break;
    }
    case "auth/weak-password": {
      errMsg = "Password is too weak, try 6+ characters.";
      break;
    }
    case "auth/user-not-found": {
      errMsg = "User does not exist.";
      break;
    }
    case "auth/wrong-password": {
      errMsg = "Invalid password.";
      break;
    }
    case "permission-denied": {
      errMsg = "You do not have the permission to take this action.";
      break;
    }
    case "": {
      errMsg = "BLAH.";
      break;
    }
    default: {
      errMsg = err.name + ":";
    }
  }
  return errMsg + " " + err['message'];
}

/**
 * https://firebase.google.com/docs/reference/rest/auth
 */
export function handleFirebaseSignInUpError(errResponse) {
  console.log(errResponse)
  let errMessage: string = "An server error has occured.";
  if (!errResponse.error || !errResponse.error.error) {
    return throwError(errMessage);
  }
  switch (errResponse.error.error.message) {
    case "EMAIL_EXISTS": {
      errMessage = "This email has already been registered.";
      break;
    }
    case "TOO_MANY_ATTEMPTS_TRY_LATER": {
      errMessage = "Too many failed login attempts, try again later.";
      break;
    }
    case "WEAK_PASSWORD": {
      errMessage = "Password should be at least 6 characters";
      break;
    }
    case "EMAIL_NOT_FOUND": {
      errMessage = "The account you are trying to sign in with does not exist.";
      break;
    }
    case "INVALID_PASSWORD": {
      errMessage = "Invalid password.";
      break;
    }
    case "USER_DISABLED": {
      errMessage = "This user has been disabled";
      break;
    }
    default: {
      errMessage = errResponse.error.error.message;
    }
  }
  return throwError(errMessage);
}



export function createInitAlias(email: string): string {
  return email.substr(0, email.indexOf("@"));
}


export function addfireKey(c: SnapshotAction<any>[]) {
  return c.map((c: SnapshotAction<any>) => {
    return (
      { fireKey: c.payload.key,
        ...c.payload.val()
      }
    )}
  );
}
