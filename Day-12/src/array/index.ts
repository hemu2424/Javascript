
import { compact, shuffle, unique, } from "./array";

const arr1 = [1,1,2,3,5,4,3,2,1, 0, 2, null, "", 4];

console.log(compact(arr1));

console.log(unique(arr1))


console.log(shuffle([1,3,2,4,3,5,7,4,6]))