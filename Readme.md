📄 Software Requirements Specification (SRS)
Project: TeamForge – Team Task Management System
🧠 1. Introduction
1.1 Purpose

This document defines the requirements for a web-based task management system where users can create projects, assign tasks, and track progress with role-based access.

1.2 Scope

The system will allow:

User authentication (email + Google login)
Project and team management
Task assignment and tracking
Dashboard for insights

The product is similar to:

Trello
Asana
1.3 Definitions
Admin → manages project, members, tasks
Member → works on assigned tasks
Task Status → Todo / In Progress / Done
🏗️ 2. Overall Description
2.1 Product Perspective

A full-stack web application with:

React frontend
Node.js backend
PostgreSQL database
2.2 User Classes
🔹 Admin
Full control over projects
Can assign tasks
🔹 Member
Limited access
Works on tasks
2.3 Operating Environment
Browser (Chrome, Edge, etc.)
Backend server (Node.js)
Database (PostgreSQL)
2.4 Constraints
Must use REST APIs
Must implement RBAC
Secure authentication required
⚙️ 3. System Features
🔐 3.1 Authentication
Description:

Users can register and log in.

Functional Requirements:
Signup with email & password
Login with credentials
Login with Google (OAuth)
JWT-based session
👥 3.2 Project & Team Management
Description:

Admins create projects and manage team members.

Functional Requirements:
Create project
Add/remove members
Assign roles
📋 3.3 Task Management
Description:

Tasks are created and assigned to users.

Functional Requirements:
Create task
Assign user
Set due date
Update status
📊 3.4 Dashboard
Description:

Provides overview of tasks.

Functional Requirements:
Total tasks
Completed tasks
Pending tasks
Overdue tasks
🔑 3.5 Role-Based Access Control (RBAC)
Rules:
Admin → full access
Member → limited access
📡 4. External Interface Requirements
4.1 User Interface
Pages:
Login / Signup
Dashboard
Project List
Project Details
Task Board
4.2 API Interface (REST)
Auth APIs:
POST /auth/signup
POST /auth/login
Project APIs:
POST /projects
GET /projects
Task APIs:
POST /tasks
PATCH /tasks/:id
🗂️ 5. Data Requirements
5.1 Entities
User
id
name
email
password
role
Project
id
title
description
Task
id
title
status
due_date
ProjectMembers
user_id
project_id
🧠 6. Non-Functional Requirements
🔒 Security
Password hashing (bcrypt)
JWT authentication
Protected APIs
⚡ Performance
Fast API response (<500ms)
Optimized queries
📈 Scalability
Modular backend structure
Clean database design
🛠️ Maintainability
Layered architecture
Clean code practices
🤖 7. Optional AI Features
🔹 Smart Task Suggestions

Use OpenAI API to:

Break tasks into subtasks
🔹 Priority Detection

Auto-set:

High / Medium / Low
🔹 Task Summary

Convert long descriptions → short summary

🧱 8. System Architecture
🔹 Layers:
Presentation Layer (React)
Application Layer (Node.js)
Data Layer (PostgreSQL + Drizzle ORM)
🔁 Data Flow:
Client → API → Backend → Database → Response
🚀 9. Future Enhancements
Notifications
Real-time updates (WebSockets)
File attachments
Comments on tasks