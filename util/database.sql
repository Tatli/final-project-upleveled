CREATE TABLE profile_type (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
);

CREATE TABLE categories (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

CREATE TABLE status (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
);

CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(150) ,
    last_name VARCHAR(150) ,
    birth_date DATE ,
    address VARCHAR(255) ,
    postal_code VARCHAR(50) ,
    city VARCHAR(150) ,
    country VARCHAR(150) ,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(50) NOT NULL,
    phone VARCHAR(30) ,
    image VARCHAR(255) ,
    role_id integer REFERENCES profile_type(id)
);

CREATE TABLE listings (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    price integer NOT NULL,
    image VARCHAR(255) ,
    description TEXT NOT NULL,
    views integer,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW(),
    user_id integer REFERENCES users(id),
    status_id integer REFERENCES status(id),
    categories_id integer REFERENCES categories(id)
);
