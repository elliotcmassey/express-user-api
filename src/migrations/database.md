CREATE TABLE `users` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `email` VARCHAR(320) NOT NULL,
  `forename` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX `email_UNIQUE` ON `users` (`email`);
INSERT INTO `users` (email, forename, surname) VALUES ('elliot@example.com', 'Elliot', 'Massey');
INSERT INTO `users` (email, forename, surname) VALUES ('test@example.com', 'Test', 'Massey');
