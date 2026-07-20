import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Открываем БД
export async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

// Инициализация таблиц
export async function initDb() {
  const db = await openDb()
  
  // Пользователи
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT DEFAULT 'EMPLOYEE',
      department TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Заявки
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      category TEXT,
      priority TEXT DEFAULT 'MEDIUM',
      status TEXT DEFAULT 'NEW',
      created_by TEXT,
      assigned_to TEXT,
      sla_deadline DATETIME,
      resolved_at DATETIME,
      time_to_resolve INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id),
      FOREIGN KEY (assigned_to) REFERENCES users(id)
    )
  `)

  // Комментарии
  await db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      text TEXT,
      is_internal INTEGER DEFAULT 0,
      ticket_id TEXT,
      author_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ticket_id) REFERENCES tickets(id),
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `)

  console.log('✅ Database initialized')
  return db
}
