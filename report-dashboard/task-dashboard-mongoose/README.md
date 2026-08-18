# Task Report Dashboard (Express + Mongoose, MVC)

Same dashboard as before, restructured into models / controllers / routes and
using Mongoose instead of the native driver.

## Setup

```bash
cd task-dashboard-mongoose
npm install
cp .env.example .env     # edit MONGODB_URI if not running Mongo locally
npm run seed               # populates users, projects, tasks with fake data
npm start                   # starts the API + serves the dashboard
```
