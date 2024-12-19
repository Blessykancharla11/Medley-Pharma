# Medley Pharma Web Application (MERN)
<img width="1280" alt="Screenshot 2024-12-19 at 5 29 01 PM" src="https://github.com/user-attachments/assets/6008ceb8-6e1e-4ef3-b9cc-edd2f876f159" />


Medley Pharma is a comprehensive web application designed to streamline and optimize the management of pharmaceutical operations. It provides an intuitive platform for users to order and pay for medicines, while offering powerful admin functionalities for managing inventory, stock levels, and customer data.
<img width="1280" alt="Screenshot 2024-12-19 at 5 29 09 PM" src="https://github.com/user-attachments/assets/406bc6db-d974-4fdb-9a2e-350ea307574c" />


## Technologies Used

### Frontend:
- **React.js**: For building the user interface with reusable components and state management.
  
### Backend:
- **Node.js**: For server-side scripting and handling requests.
- **Express.js**: For creating a robust API and handling routing.

### Database:
- **MongoDB**: A NoSQL database for storing and retrieving data efficiently.

### Authentication:
- **JSON Web Tokens (JWT)**: For secure user authentication and session management.
<img width="1279" alt="Screenshot 2024-12-19 at 5 29 18 PM" src="https://github.com/user-attachments/assets/2d6a23d2-ec0f-47f7-b8de-6c7f66114deb" />


## Key Features

- **User Authentication**: Secure login and registration system using JWT for authentication.
- **Admin Dashboard**: Admin functionalities for managing pharmaceutical products, including adding, updating, and deleting product information (name, category, price, stock levels, expiry dates).
- **Inventory Management**: 
  - Product Management: Add, edit, and delete products.
  - Stock Tracking: Track stock levels to prevent overstocking or stockouts.
  - Expired Product Handling: Prevent purchase of expired medicines.
- **Customer Management**: Maintain a database of customers with contact information and purchase history.
<img width="1280" alt="Screenshot 2024-12-19 at 5 30 31 PM" src="https://github.com/user-attachments/assets/94dfdbbb-5892-4b04-a6c8-6b46a8c1ec6b" />


## Development Process

### Frontend Development:
- **Component-Based Architecture**: Built using React.js for modular, reusable components.
- **State Management**: Used React’s `useState` and `useEffect` hooks for managing application state.

### Backend Development:
- **API Development**: Built with Express.js to handle user authentication, product management, and other routes.
- **Database Integration**: Integrated MongoDB with Mongoose for efficient data modeling and interactions.
- **Authentication**: Implemented JWT for secure user authentication, ensuring authorized access to certain features.
<img width="1280" alt="Screenshot 2024-12-19 at 5 30 55 PM" src="https://github.com/user-attachments/assets/21d4e9b7-ba68-4b98-9bf1-783c28baeda4" />


### Project Development Workflow:
1. **Planning**: Identified the key features and functionalities.
2. **Frontend Implementation**: Developed React components.
3. **Backend Implementation**: Created the Express.js API and integrated it with MongoDB.
4. **Integration**: Connected the frontend with the backend API to ensure smooth data exchange and functionality.
<img width="1280" alt="Screenshot 2024-12-19 at 5 31 20 PM" src="https://github.com/user-attachments/assets/bf44c1a8-85ce-4021-9e74-d47dd6226665" />

<img width="1280" alt="Screenshot 2024-12-19 at 5 31 40 PM" src="https://github.com/user-attachments/assets/0460a318-395b-4c3b-86fd-7ef54235fe08" />
![Uploading Screenshot 2024-12-19 at 5.31.58 PM.png…]()



## How to Run the Application

### Prerequisites:
- Node.js
- MongoDB (locally or using MongoDB Atlas)

### Installation:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Install dependencies for both frontend and backend:

   - For the backend:
     ```bash
     cd backend
     npm install
     ```

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. Set up environment variables:
   - Create a `.env` file in the root of both the frontend and backend with the necessary environment variables (e.g., JWT secret, MongoDB connection URL).

4. Run the application:

   - For the backend:
     ```bash
     cd backend
     node server.js
     ```

   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Open the browser and go to `http://localhost:3000` to access the application.

## Conclusion

Medley Pharma is a feature-rich web application that optimizes pharmaceutical management, offering seamless user experiences and powerful admin controls. This application improves operational efficiency by providing real-time inventory updates, secure login, and user-friendly interfaces for both customers and admins.

---

### Copyright
© 2024 Medley Pharma Web Application. All rights reserved.

With love❤️ [BlessyKancharla11](https://github.com/Blessykancharla11)

---

This includes the copyright section and your sign-off! Let me know if you'd like any further changes.
