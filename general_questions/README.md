# Knowledge questions

- Explain what are prototypes and how does class inheritance make use of them?

Prototypes in JavaScript are objects that serve as a fallback reference for properties and methods in other objects. Class inheritance in JavaScript utilizes prototypes to enable object sharing and method overriding between parent and child classes.

- When starting a new project how would you choose between OOP and Functional Programming?

When choosing between OOP and Functional Programming for web development, it depends on the project's specific requirements and complexity.

If the project involves complex domain models, encapsulation of state and behavior, and emphasizes code organization, maintainability, and extensibility, Object-Oriented Programming (OOP) may be a suitable choice.

On the other hand, if the project focuses on immutability, pure functions, and emphasizes simplicity, reusability, and scalability, Functional Programming (FP) may be a better fit. It's also worth considering a hybrid approach that combines the strengths of both paradigms to leverage the benefits of each based on specific needs.

- How does `Proxy` work in JS and when is it useful?

In JavaScript, Proxy is a built-in object that enables custom behavior to be defined for fundamental operations on an object, such as property access, assignment, and function invocation. It allows intercepting and modifying these operations, providing fine-grained control over the target object's behavior. Proxies are useful for implementing features like object validation, dynamic property handling, logging, and more advanced tasks.

- What patterns/practices/tools would you use to implement simple cache for NoSQL database?

To implement a simple cache for a NoSQL database, I would consider using the Cache-Aside pattern, where the application first checks the cache for the requested data and, if not found, retrieves it from the database and stores it in the cache for subsequent requests. Tools like Redis or Memcached can be used as an in-memory cache to provide fast and efficient caching capabilities for NoSQL databases.

- What libraries do you consider necessary for any application? Which ones do you use most commonly?

Front End: React, Angular, Vue, Typescript, MaterialUI
Back End: C#/.Net, Java Spring Boot, Python, Node, PHP
IDE: Visual Studio, Visual Studio Code

- How would you choose a backend? When would you use HTTP server, serverless functions or Websockets?

When choosing a backend for web development, consider the scalability, complexity, and specific requirements of application.

1. Use an HTTP server (e.g., Node.js with Express) when need a traditional server architecture with full control over the infrastructure, complex business logic, and support for various HTTP-based communication patterns.
2. Use serverless functions (e.g., AWS Lambda, Google Cloud Functions) when focus on writing code without managing servers, have event-driven functionality, and benefit from auto-scaling and pay-per-use pricing models.
3. Use WebSockets when need real-time bidirectional communication between the client and server, such as chat applications, collaborative editing, or live updates. WebSockets provide efficient and persistent connections that allow data to be pushed to the client instantly.

- Code below is supposed to print `[{name: "Tom", id: 0}, {name: "Kate", id: 1}]`. Explain why it doesn't and explain how would you fix it.

```js
class IdGenerator {
  lastId = 0;
  getId() {
    return this.lastId++;
  }
}
const { getId } = new IdGenerator();
const people = ["Tom", "Kate"].map((name) => ({ name, id: getId() }));
console.log(people);
```

The solution is below.

```js
class IdGenerator {
  lastId = 0;
  getId() {
    return this.lastId++;
  }
}

const idGenerator = new IdGenerator();
const people = ["Tom", "Kate"].map((name) => ({ name, id: idGenerator.getId() }));
console.log(people);
```
