create TABLE users (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  user_name VARCHAR(30),
  user_password VARCHAR(40),  
  user_email VARCHAR(100),
  user_create_date DATE
);