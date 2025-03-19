-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `comments` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`content` text NOT NULL,
	`posted_at` timestamp DEFAULT 'current_timestamp()',
	`user_id` int(11) NOT NULL,
	`project_id` int(11) DEFAULT 'NULL',
	`task_id` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL,
	`is_favorite` tinyint(1) NOT NULL,
	`user_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`content` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`due_date` date NOT NULL,
	`is_completed` tinyint(1) NOT NULL,
	`created_at` date NOT NULL,
	`project_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX `project_id` ON `comments` (`project_id`);--> statement-breakpoint
CREATE INDEX `task_id` ON `comments` (`task_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `comments` (`user_id`);--> statement-breakpoint
CREATE INDEX `project_id` ON `tasks` (`project_id`);
*/