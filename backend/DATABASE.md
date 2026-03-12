# Database Documentation

## Connection Details
- Host: db (Docker service name)
- Port: 3306
- Database name: tasksdb
- Username: appuser

## Table: tasks

| Column | Type         | Description              |
|--------|--------------|--------------------------|
| id     | INT          | Auto-incrementing ID     |
| title  | VARCHAR(255) | The task description     |
| done   | BOOLEAN      | Whether task is complete |