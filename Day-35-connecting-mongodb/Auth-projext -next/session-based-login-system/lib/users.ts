export type User = {
    id: number;
    email:string;
    password:string;
    name:string;
}

export const users : User[] = [
 {
    id: 1,
    name: "Himanshu",
    email: "himanshu@gmail.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com",
    password: "abcdef",
  },

]