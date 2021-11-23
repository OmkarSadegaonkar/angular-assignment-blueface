import { Injectable } from '@angular/core';
export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
}
@Injectable({ providedIn: 'root' })
export class ProfileService {
  public user: IProfile = {} as IProfile;

  constructor() { }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            age: 30,
            email: 'michale.collins@gmail.com'
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.setUserEmail(firstName, lastName).then(() => {
            this.user.firstName = firstName;
            this.user.lastName = lastName;
            resolve(this.user);
          }).catch((setEmailError) => {
            reject(setEmailError);
          })
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail(firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          const newEmail = `${firstName.trim()}.${lastName.trim()}@blueface.com`;
          if (this.validateEmail(newEmail)) {
            this.user.email = newEmail;
            resolve(this.user);
            return;
          } else {
            reject({ error: 'Invalid firstName and/or lastName' });
          }
        } else {
          reject({ error: 'Error on email generation' });
        }
      }, Math.random() * 5000);
    });
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
}