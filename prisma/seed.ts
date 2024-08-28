const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const snippets = [
    {
      title: "Hello World in JavaScript",
      code: 'console.log("Hello World");',
      type: "CODE",
    },
    {
      title: "Basic HTML Structure",
      code: "<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>",
      type: "HTML",
    },
    {
      title: "Simple CSS Styling",
      code: "body {\n  font-family: Arial, sans-serif;\n  color: #333;\n}",
      type: "CSS",
    },
    {
      title: "FizzBuzz in Python",
      code: 'for i in range(1, 101):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
      type: "PYTHON",
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
    {
      title: "Palindrome Checker in JavaScript",
      code: 'function isPalindrome(str) {\n  const reversed = str.split("").reverse().join("");\n  return str === reversed;\n}',
      type: "CODE",
    },
    {
      title: "SQL Query for Users",
      code: "SELECT * FROM users WHERE active = 1;",
      type: "SQL",
    },
    {
      title: "Markdown Example",
      code: "# This is a heading\n\nThis is a paragraph.\n\n- This is a list item",
      type: "MARKDOWN",
    },
    {
      title: "JavaScript Array Methods",
      code: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);",
      type: "CODE",
    },
    {
      title: "React Component Example",
      code: 'import React from "react";\n\nfunction MyComponent() {\n  return <div>Hello, world!</div>;\n}\n\nexport default MyComponent;',
      type: "REACT",
    },
    {
      title: "Python Lambda Function",
      code: "add = lambda x, y: x + y\nprint(add(5, 3))",
      type: "PYTHON",
    },
    {
      title: "Basic SQL Insert",
      code: 'INSERT INTO users (name, email) VALUES ("John Doe", "john@example.com");',
      type: "SQL",
    },
    {
      title: "JavaScript Fetch Example",
      code: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));',
      type: "CODE",
    },
    {
      title: "CSS Flexbox Layout",
      code: ".container {\n  display: flex;\n  justify-content: space-between;\n}",
      type: "CSS",
    },
    {
      title: "HTML Form Example",
      code: '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name">\n  <input type="submit" value="Submit">\n</form>',
      type: "HTML",
    },
    {
      title: "Basic Bash Script",
      code: '#!/bin/bash\n\necho "Hello, World!"',
      type: "BASH",
    },
    {
      title: "Node.js HTTP Server",
      code: 'const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader("Content-Type", "text/plain");\n  res.end("Hello, World!");\n});\n\nserver.listen(3000, "127.0.0.1", () => {\n  console.log("Server running at http://127.0.0.1:3000/");\n});',
      type: "NODEJS",
    },
    {
      title: "Python List Comprehension",
      code: "squares = [x ** 2 for x in range(10)]\nprint(squares)",
      type: "PYTHON",
    },
    {
      title: "HTML Table Example",
      code: "<table>\n  <tr>\n    <th>Header 1</th>\n    <th>Header 2</th>\n  </tr>\n  <tr>\n    <td>Data 1</td>\n    <td>Data 2</td>\n  </tr>\n</table>",
      type: "HTML",
    },
    {
      title: "CSS Grid Layout",
      code: ".grid-container {\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n}",
      type: "CSS",
    },
    {
      title: "Basic Python Class",
      code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(f"{self.name} says woof!")\n\nmy_dog = Dog("Fido")\nmy_dog.bark()',
      type: "PYTHON",
    },
  ];

  await prisma.snippet.createMany({
    data: snippets,
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
