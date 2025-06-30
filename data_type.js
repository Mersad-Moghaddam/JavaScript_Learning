// Data Types in JavaScript
// JavaScript has dynamic typing, meaning variables can hold values of any type and can change types
// at runtime. The main data types in JavaScript are:

// Primitive data types: string, number, boolean, null, undefined
// Reference data types: object, array

var fname ="Mersad"
console.log(fname);

let age = 25;
console.log(age);

const isStudent = true;
console.log(isStudent);

const hobbies = ["reading", "gaming", "coding"];
console.log(hobbies);
const person = {
    name: "Mersad",
    age: 25,
    isStudent: true
};
console.log(person);

var text = "this is \"a string\" with a quote";
console.log(text);

text = 'this is "a string" with a double quote';
console.log(text);

var ourV= "i come first" + " i come second";
console.log(ourV);


var lname = "Moghaddam"
var myDetail = `My name is ${fname} and I am ${age} years old`;
console.log(myDetail);

var firstLetterOfName = fname[0];
console.log(firstLetterOfName);
var firstLetterOfLastName = lname[0];
console.log(firstLetterOfLastName);

var lastLetterOfName = fname[fname.length - 1];
console.log(lastLetterOfName);
var lastLetterOfLastName = lname[lname.length - 1];
console.log(lastLetterOfLastName);

// String methods
var str = "Hello, World!";
console.log(str.length); // Length of the string
console.log(str.toUpperCase()); // Convert to uppercase
console.log(str.toLowerCase()); // Convert to lowercase
console.log(str.indexOf("World")); // Find index of substring
console.log(str.slice(0, 5)); // Extract substring
console.log(str.replace("World", "JavaScript")); // Replace substring
console.log(str.split(", ")); // Split string into array
console.log(str.trim()); // Remove whitespace from both ends
// String concatenation
var str1 = "Hello";
var str2 = "World";
var concatenated = str1 + " " + str2;
console.log(concatenated); // Output: "Hello World"
// String interpolation
var name = "Mersad";
var greeting = `Hello, ${name}!`;
console.log(greeting); // Output: "Hello, Mersad!" 
// String comparison
var strA = "apple";
var strB = "banana";
console.log(strA === strB); // false
console.log(strA !== strB); // true
console.log(strA < strB); // true (lexicographical comparison)
console.log(strA > strB); // false (lexicographical comparison)
// String search
var searchStr = "Hello, World!";
console.log(searchStr.includes("World")); // true
console.log(searchStr.startsWith("Hello")); // true
console.log(searchStr.endsWith("!")); // true
// String escaping
var escapedStr = "This is a string with a newline character\nand a tab character\tand a backslash \\";
console.log(escapedStr); // Output: "This is a string with a newline character
// and a tab character  and a backslash \"
// String template literals
var templateLiteral = `This is a template literal with a variable: ${name}`;
console.log(templateLiteral); // Output: "This is a template literal with a variable: Mersad"
// String methods chaining
var str = "Hello, World!";
console.log(str.toUpperCase().slice(0, 5)); // Output: "HELLO"
// String immutability
var originalStr = "Hello";
var modifiedStr = originalStr.replace("H", "J");
console.log(originalStr); // Output: "Hello" (original string remains unchanged)
console.log(modifiedStr); // Output: "Jello" (new string created)
// String conversion
var num = 123;
var strNum = num.toString();
console.log(strNum); // Output: "123"
var bool = true;
var strBool = bool.toString();
console.log(strBool); // Output: "true"
// String methods with numbers
var numStr = "42";
console.log(parseInt(numStr)); // Convert string to integer: 42
console.log(parseFloat(numStr)); // Convert string to float: 42
console.log(Number(numStr)); // Convert string to number: 42
console.log(isNaN(numStr)); // Check if value is NaN: false
console.log(isFinite(numStr)); // Check if value is finite: true  
// String methods with arrays
var arr = ["apple", "banana", "cherry"];
console.log(arr.join(", ")); // Join array elements into a string: "apple, banana, cherry"
console.log(arr.toString()); // Convert array to string: "apple,banana,cherry"
console.log(arr.includes("banana")); // Check if array includes "banana": true
console.log(arr.indexOf("cherry")); // Find index of "cherry": 2
console.log(arr.slice(1, 3)); // Extract elements from index 1 to 3: ["banana", "cherry"]
console.log(arr.map(item => item.toUpperCase())); // Convert each element to uppercase: ["APPLE", "BANANA", "CHERRY"]
console.log(arr.filter(item => item.startsWith("b"))); // Filter elements starting with "b": ["banana"]
console.log(arr.reduce((acc, item) => acc + item.length, 0)); // Calculate total length of all elements: 16
console.log(arr.sort()); // Sort array alphabetically: ["apple", "banana", "cherry"]
console.log(arr.reverse()); // Reverse array: ["cherry", "banana", "apple"]
console.log(arr.length); // Get length of   array: 3
console.log(arr[0]); // Access first element: "apple"
console.log(arr[arr.length - 1]); // Access last element: "cherry"
console.log(arr.push("date")); // Add "date" to the end of the array: 4
console.log(arr); // Output: ["apple", "banana", "cherry", "date"]
console.log(arr.pop()); // Remove last element: "date"
console.log(arr); // Output: ["apple", "banana", "cherry"]
console.log(arr.shift()); // Remove first element: "apple"
console.log(arr); // Output: ["banana", "cherry"]
console.log(arr.unshift("kiwi")); // Add "kiwi" to the beginning of the array: 3
console.log(arr); // Output: ["kiwi", "banana", "cherry"]
console.log(arr.splice(1, 1)); // Remove 1 element at index 1: ["banana"]
console.log(arr); // Output: ["kiwi", "cherry"]
console.log(arr.slice(0, 2)); // Extract elements from index 0 to 2: ["kiwi", "cherry"]
console.log(arr.includes("kiwi")); // Check if array includes "kiwi": true
console.log(arr.indexOf("cherry")); // Find index of "cherry": 1
console.log(arr.join(" - ")); // Join array elements into a string with " - ": "kiwi - cherry"
console.log(arr.toString()); // Convert array to string: "kiwi,cherry"
console.log(arr.map(item => item.toUpperCase())); // Convert each element to uppercase: ["KIWI", "CHERRY"]
console.log(arr.filter(item => item.startsWith("k"))); // Filter elements starting with "k": ["KIWI"]
console.log(arr.reduce((acc, item) => acc + item.length, 0)); // Calculate total length of all elements: 10
console.log(arr.sort()); // Sort array alphabetically: ["cherry", "kiwi"]
console.log(arr.reverse()); // Reverse array: ["kiwi", "cherry"]
console.log(arr.length); // Get length of array: 2
console.log(arr[0]); // Access first element: "kiwi"
console.log(arr[arr.length - 1]); // Access last element: "cherry"
// Array methods
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.length); // Length of the array
console.log(numbers.push(6)); // Add an element to the end of the array
console.log(numbers); // Output: [1, 2, 3, 4, 5, 6]
console.log(numbers.pop()); // Remove the last element of the array
console.log(numbers); // Output: [1, 2, 3, 4, 5]
console.log(numbers.shift()); // Remove the first element of the array
console.log(numbers); // Output: [2, 3, 4, 5]
console.log(numbers.unshift(1)); // Add an element to the beginning of the array
console.log(numbers); // Output: [1, 2, 3, 4, 5]
console.log(numbers.slice(1, 3)); // Extract a portion of the array
console.log(numbers); // Output: [2, 3]
console.log(numbers.splice(1, 2)); // Remove elements from the array
console.log(numbers); // Output: [1, 4, 5]
console.log(numbers.indexOf(4)); // Find the index of an element in the array
console.log(numbers.includes(5)); // Check if an element exists in the array
console.log(numbers.join(", ")); // Convert the array to a string
console.log(numbers.toString()); // Convert the array to a string


console.log("-------------------");
// tuple
var tuple = [1, "two", true];
console.log(tuple); // Output: [1, "two", true]
console.log(tuple[0]); // Access first element: 1
console.log(tuple[1]); // Access second element: "two"
console.log(tuple[2]); // Access third element: true
tuple[0] = 10; // Modify first element
console.log(tuple); // Output: [10, "two", true]
tuple.push("three"); // Add a new element
console.log(tuple); // Output: [10, "two", true, "three"]
tuple.pop(); // Remove the last element
console.log(tuple); // Output: [10, "two", true]
tuple.shift(); // Remove the first element
console.log(tuple); // Output: ["two", true]
