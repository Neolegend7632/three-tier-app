# Database Schema - Student Task Manager

## Overview

The **Student Task Manager** is a simple 3-tier web application that helps students track assignments, study tasks, and to-dos.  
The database layer uses **MySQL** and stores user tasks with basic CRUD operations (Create, Read, Update, Delete) and status tracking.

Current frontend features supported by the schema:
- Add new task
- View list of tasks
- Mark task as **Done** / **Undo** (toggle completion status)
- Delete task

Future extensions (not yet implemented in frontend):
- User authentication (multi-user support)
- Due dates & priorities
- Categories / subjects

## Entity-Relationship Summary

At this stage we use a **very simple single-table design** suitable for the current frontend:

**Tasks** (main entity)

- No separate Users table yet (single-user / shared list mode)
- No separate Lists/Categories table (all tasks in one flat list)

## Tables

### 1. tasks

Stores individual student tasks/assignments.

| Column          | Data Type         | Constraints / Attributes                  | Description                                      |
|-----------------|-------------------|-------------------------------------------|--------------------------------------------------|
| id              | INT               | PRIMARY KEY, AUTO_INCREMENT               | Unique task identifier                           |
| title           | VARCHAR(255)      | NOT NULL                                  | Main task name (e.g. "Assignment (week 1)")      |
| status          | ENUM('pending', 'done') | NOT NULL, DEFAULT 'pending'         | Completion state (shown as "Done" / "Undo")      |

## SQL Creation Script

```sql
CREATE DATABASE IF NOT EXISTS student_task_manager;
USE student_task_manager;

CREATE TABLE tasks (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    description   TEXT,
    status        ENUM('pending', 'done') NOT NULL DEFAULT 'pending',
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
