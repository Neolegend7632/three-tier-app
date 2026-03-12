# Database Schema - MySQL (To-Do App)

Our to-do application allows users to create, view, update, and delete their personal tasks.

We use two main tables:

### 1. users table
Stores user accounts (for login and ownership of tasks).

| Column name   | Data type     | Description                              | Constraints / Extra                  |
|---------------|---------------|------------------------------------------|--------------------------------------|
| id            | INT           | Unique ID for each user                  | PRIMARY KEY, AUTO_INCREMENT          |
| username      | VARCHAR(50)   | User's chosen username                   | NOT NULL, UNIQUE                     |
| email         | VARCHAR(100)  | User's email address                     | NOT NULL, UNIQUE                     |
| password      | VARCHAR(255)  | Hashed password (never store plain text) | NOT NULL                             |
| created_at    | DATETIME      | When the account was created             | DEFAULT CURRENT_TIMESTAMP            |

### 2. tasks table
Stores the actual to-do items. Each task belongs to one user.

| Column name   | Data type     | Description                              | Constraints / Extra                  |
|---------------|---------------|------------------------------------------|--------------------------------------|
| id            | INT           | Unique ID for each task                  | PRIMARY KEY, AUTO_INCREMENT          |
| user_id       | INT           | Which user this task belongs to          | NOT NULL, FOREIGN KEY → users(id)    |
| title         | VARCHAR(200)  | Short description of the task            | NOT NULL                             |
| description   | TEXT          | Optional longer details                  | NULL allowed                         |
| completed     | TINYINT(1)    | 0 = not done, 1 = done                   | DEFAULT 0                            |
| due_date      | DATE          | Optional deadline                        | NULL allowed                         |
| created_at    | DATETIME      | When the task was added                  | DEFAULT CURRENT_TIMESTAMP            |
| updated_at    | DATETIME      | Last time the task was changed           | ON UPDATE CURRENT_TIMESTAMP          |

### Quick Notes
- One user can have many tasks (1-to-many relationship).
- The `user_id` column connects each task to its owner.
