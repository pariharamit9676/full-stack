# BookStore Application

## Overview

BookStore is a full-stack web application where users can browse, search, and review books. The application consists of a React frontend and a Node.js/Express backend with a MySQL database. It supports features like pagination, filtering by genre, adding new books, and user reviews.

---

## Features

- Browse and search books with pagination
- Filter books by genre
- View detailed book information
- User authentication (signup/login)
- Add reviews for books
- Responsive design with Tailwind CSS
- Admin panel to add new books

---

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js, MySQL, JWT


---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database server

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pariharamit9676/full-stack-book-review-platform
   cd your-repo

2. Install dependencies for backend:
cd backend
npm install

3. Install dependencies for frontend:
cd ../frontend
npm install

4. Setup environment variables:
Create .env files in both /backend and /frontend folders as needed.

From /backend folder:
npm run dev

From /frontend folder:
npx nodemon

5. Database Schema Design (MySQL)
Users Table: 

| Column      | Type         | Constraints                  | Description                |
| ----------- | ------------ | ---------------------------- | -------------------------- |
| id          | INT          | PRIMARY KEY, AUTO\_INCREMENT | Unique user ID             |
| username    | VARCHAR(50)  | NOT NULL, UNIQUE             | User's username            |
| email       | VARCHAR(100) | NOT NULL, UNIQUE             | User's email               |
| password    | VARCHAR(255) | NOT NULL                     | Hashed password            |
| created\_at | TIMESTAMP    | DEFAULT CURRENT\_TIMESTAMP   | Account creation timestamp |

Books Table:
| Column      | Type         | Constraints                  | Description               |
| ----------- | ------------ | ---------------------------- | ------------------------- |
| id          | INT          | PRIMARY KEY, AUTO\_INCREMENT | Unique book ID            |
| title       | VARCHAR(255) | NOT NULL                     | Book title                |
| author      | VARCHAR(255) | NOT NULL                     | Author's name             |
| genre       | VARCHAR(100) |                              | Book genre/category       |
| thumbnail   | VARCHAR(255) |                              | URL or path to book image |
| description | TEXT         |                              | Book description          |
| created\_at | TIMESTAMP    | DEFAULT CURRENT\_TIMESTAMP   | When the book was added   |

Reviews Table:
| Column      | Type      | Constraints                                        | Description           |
| ----------- | --------- | -------------------------------------------------- | --------------------- |
| id          | INT       | PRIMARY KEY, AUTO\_INCREMENT                       | Unique review ID      |
| book\_id    | INT       | FOREIGN KEY REFERENCES books(id) ON DELETE CASCADE | Associated book       |
| user\_id    | INT       | FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE | User who wrote review |
| rating      | TINYINT   | NOT NULL CHECK (rating BETWEEN 1 AND 5)            | Rating (1 to 5)       |
| comment     | TEXT      |                                                    | Review text           |
| created\_at | TIMESTAMP | DEFAULT CURRENT\_TIMESTAMP                         | Review timestamp      |

