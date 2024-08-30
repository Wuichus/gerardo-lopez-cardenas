-- Create the db if it doesn't already exist
CREATE DATABASE IF NOT EXISTS tedencys;

-- Move into the db
\c tedencys

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS "product"
(
    "id" serial NOT null primary key,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "height" float NOT NULL,
    "length" float NOT NULL,
    "width" float NOT NULL,
    "created_at" date not null default CURRENT_DATE,
    "updated_at" date not null default CURRENT_DATE
);
-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS "user"
(
    "id" serial NOT null primary key,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "img_profile" TEXT NOT NULL,
    "created_at" date not null default CURRENT_DATE,
    "updated_at" date not null default CURRENT_DATE
);
-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS "token"
(
    "user_id" serial NOT null primary key,
    "token" TEXT NOT NULL,
    "created_at" date not null default CURRENT_DATE,
    "updated_at" date not null default CURRENT_DATE
);
