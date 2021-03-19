DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);































-- DROP DATABASE IF EXISTS employees;
-- CREATE DATABASE employees;
-- USE employees;


-- CREATE TABLE department(
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--      name VARCHAR(30) NOT NULL);

--      CREATE TABLE role
--      (id INTEGER AUTO_INCREMENT PRIMARY KEY,
--      title VARCHAR(30), salary DECIMAL, 
--      department_id INTEGER FOREIGN KEY);

-- CREATE TABLE employee(
--      id INTEGER AUTO_INCREMENT PRIMARY KEY,
--      first_name VARCHAR(30),
--      last_name VARCHAR(30),
--      role_id INTEGER FOREIGN KEY,
--      manager_id INTEGER FOREIGN KEY);



--   CREATE TABLE parties (
--   id INTEGER PRIMARY KEY,
--   name VARCHAR(50) NOT NULL,
--   description TEXT
-- );

-- CREATE TABLE candidates (
--   id INTEGER PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   party_id INTEGER UNSIGNED,
--   industry_connected BOOLEAN NOT NULL,
--   CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
-- );

-- CREATE TABLE voters (
--   id INTEGER PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   email VARCHAR(50) NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE votes (
--   id INTEGER PRIMARY KEY,
--   voter_id INTEGER UNSIGNED NOT NULL,
--   candidate_id INTEGER UNSIGNED NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT uc_voter UNIQUE (voter_id),
--   CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
--   CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
-- );