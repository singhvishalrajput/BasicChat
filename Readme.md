# BasicChat

Welcome to **BasicChat**, a straightforward chat application built using Node.js, Express, and MongoDB. This project serves as a simple platform where users can create, view, edit, and delete chat messages. While the functionality is basic, the primary focus is on implementing robust error handling and middleware management.

## Features

- **Create Chat Messages:** Users can create chat messages specifying the sender and receiver.
- **View Chats:** Display all chat messages with timestamps.
- **Edit Chats:** Users can edit their existing messages.
- **Delete Chats:** Remove chat messages easily.
- **Error Handling:** Strong focus on managing asynchronous errors using middleware and try-catch blocks.

## Project Structure

- **`models/chat.js`**: Defines the schema for chat messages using Mongoose.
- **`views/`**: Contains EJS templates (`index.ejs`, `new.ejs`, `edit.ejs`) for rendering the frontend.
- **`public/style.css`**: Styles the chat application.
- **`app.js`**: Main application file that sets up routes, middleware, and error handling.
- **`ExpressError.js`**: Custom error class for managing application-specific errors.

## Error Handling & Middleware Focus

**BasicChat** emphasizes handling asynchronous errors gracefully, ensuring that the application remains robust and user-friendly. Key aspects include:

1. **Middleware for Error Handling**:
    - Middleware is used to catch and manage errors that might occur during request processing.
    - The `ExpressError` class is utilized to create custom error messages and statuses, ensuring that errors are communicated clearly to the end-user.

2. **Using `asyncWrap` Function**:
    - The `asyncWrap` function is a custom utility that wraps asynchronous route handlers.
    - It ensures that any errors thrown within an asynchronous function are caught and passed to the next error-handling middleware.

3. **Try-Catch Blocks**:
    - Asynchronous functions, particularly those interacting with the database, are enclosed in try-catch blocks.
    - This prevents unhandled promise rejections and allows for detailed error logging and user feedback.

### Example: Error Handling in Action

```javascript
// Sample route with async error handling
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        next(new ExpressError(404, "Chat not found."));
    }
    res.render("edit.ejs", { chat });
}));
```

In the above example, the `asyncWrap` function catches any errors in the asynchronous code and passes them to the next middleware, where custom error messages are rendered.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/BasicChat.git
cd BasicChat
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node app.js
```

The application will be available at `http://localhost:8085`.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** running locally.

## Contributing

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**BasicChat** is a learning project that showcases the integration of middleware, error handling, and basic CRUD operations. Whether you're looking to build a simple chat application or explore error handling techniques in Node.js, this project serves as a solid foundation.

Happy Coding!
