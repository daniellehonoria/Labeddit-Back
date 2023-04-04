-- Active: 1680637690071@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    nickname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
DROP Table users;
