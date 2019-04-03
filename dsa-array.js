const memory = require("./memory.js");
// 1. Implement an Array class from scratch.
let Memory = new memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;

    this.ptr = Memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of Memory");
    }
    Memory.copy(this.ptr, oldPtr, this.length);
    Memory.free(oldPtr);
    this._capacity = size;
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return Memory.get(this.ptr + index);
  }
  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    Memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

// function main() {
//   Array.SIZE_RATIO = 3;

//   // Create an instance of the Array class
//   let arr = new Array();

//   // Add an item to the array
//   arr.push("tauhida");
//   // arr.push(11);

//   console.log(arr.get(0));
// }

// main();

// 2. Explore the push() method
// What is the length, capacity and memory address of your array?
// Array { length: 1, _capacity: 3, ptr: 0 }
// What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.
// Array { length: 6, _capacity: 12, ptr: 3 }
// We started with a length and capacity of 0. After adding 1 to length, this met the if condition inside the push function to change the capacity to (this.length + 1) * ARR.SIZE_RATIO = (0 + 1) * 3 = 3. And we meet the condition again once we add a 3rd element and the capacity is changed from 6 to (3 + 1) * 3 = 12.

// 3. Exploring the pop() method
// What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
// Array { length: 9, _capacity: 12, ptr: 3 }. The length decreased from 12 to 9 because we popped 3 elements which deletes the last 3 elements that were pushed. Capacity and pointer remain unchanged.

// 4. Understanding more about how arrays work
// Print the 1st item in the array arr.
// Answer: 3
// Empty the array and add just 1 item: arr.push("tauhida");
// Print this 1 item that you just added. What is the result? Can you explain your result? // Answer: NaN, because the the data type (string) exceeds the bit limit for the constructor object Float64Array(1064) in the memory module when we try to push the value to our array. We can change Float64Array(1064) to ArrayBuffer(1064) to support string values.
// What is the purpose of the _resize() function in your Array class?
// The purpose of the resize function is to increase the capacity whenever the length of the array is equal to or greater than the capacity and it changes position of the pointer to the beginning of the newly allocated empty spaces.

const urlify = function(string) {
  let newUrl = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") {
      newUrl += "%20";
    } else {
      newUrl += string[i];
    }
  }
  return newUrl;
};

// console.log(urlify("www.thinkful.com /tauh ida parv een"));

const filterOutFive = function(arr) {
  const noFiveArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 5) {
      noFiveArray.push(arr[i]);
    }
  }
  return noFiveArray;
};
