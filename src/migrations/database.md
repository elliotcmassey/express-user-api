# Database schema

This is the basic table schema for a basic user. Some assumptions were made regarding whether values are not null or not.

This also initialises the sqlite3 database with 2 users for demonstration.

The one thing to note is that the email column of the database has a unique index, which is to enforce the standard constraint of no reuse of emails.

``` sql
CREATE TABLE `users` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `email` VARCHAR(320) NOT NULL,
  `forename` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX `email_UNIQUE` ON `users` (`email`);

INSERT INTO `users` (email, forename, surname)
VALUES ('elliot@example.com', 'Elliot', 'Massey');

INSERT INTO `users` (email, forename, surname)
VALUES ('test@example.com', 'Test', 'Massey');
```
