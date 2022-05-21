DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `hashtag`;
DROP TABLE IF EXISTS `relationship`;
DROP TABLE IF EXISTS `likes_post`;
DROP TABLE IF EXISTS `hashtag_post`;

--should there be a default value for some of them?

-- user table
CREATE TABLE `user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`display_name` varchar(255) NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE=InnoDB;

-- post table
CREATE TABLE `post` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`date` DATE NOT NULL,
	`text` varchar(255) NOT NULL,
	`user_id` int(11),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES user(`id`)
) ENGINE=InnoDB;

-- hashtag table
CREATE TABLE `hashtag` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- relationship table
CREATE TABLE `relationship` (
	`user_id` int(11),
	`follow_id` int(11),
	FOREIGN KEY (`user_id`) REFERENCES user(`id`),
	FOREIGN KEY (`follow_id`) REFERENCES user(`id`)
) ENGINE=InnoDB;

--likes_post table
CREATE TABLE `likes_post` (
	`user_id` int(11),
	`post_id` int(11),
	`date` DATE NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES user(`id`),
	FOREIGN KEY (`post_id`) REFERENCES post(`id`)
) ENGINE=InnoDB;

--hashtag_post table
CREATE TABLE `hashtag_post` (
	`hash_id` int(11),
	`post_id` int(11),
	FOREIGN KEY (`hash_id`) REFERENCES hashtag(`id`),
	FOREIGN KEY (`post_id`) REFERENCES post(`id`)
) ENGINE=InnoDB;

/*
DROP TABLE hashtag_post;
DROP TABLE likes_post;
DROP TABLE relationship;
DROP TABLE hashtag;
DROP TABLE post;
DROP TABLE user;
*/

/*
DESCRIBE user;
DESCRIBE post;
DESCRIBE hashtag;
DESCRIBE relationship;
DESCRIBE likes_post;
DESCRIBE hashtag_post;
*/

-- Sample data inputs
--INSERT INTO table() VALUES ();

--user data
INSERT INTO user(email, password, display_name) VALUES ('bobj@gmail.com', 'bob123jim', 'jim_bob');
INSERT INTO user(email, password, display_name) VALUES ('johnc@oregonstate.edu', '4password3', 'corn_john');
INSERT INTO user(email, password, display_name) VALUES ('beanb@oregonstate.edu', 'benbeanstalk123', 'ben_bean');

--post data
INSERT INTO post(user_id, date, text) 
VALUES (
	(SELECT id FROM user WHERE display_name = 'jim_bob'),
	'2019-08-21', 'holy crap'),
	((SELECT id FROM user WHERE display_name = 'corn_john'),
	'2020-10-05', 'butterfly in the sky'),
	((SELECT id FROM user WHERE display_name = 'ben_bean'),
	'2020-11-10', 'testing 1 2 3'
);

--hashtag data
INSERT INTO hashtag(name) VALUES ('beach');
INSERT INTO hashtag(name) VALUES ('OSU');
INSERT INTO hashtag(name) VALUES ('fyp');

--relationship data
INSERT INTO relationship(user_id, follow_id) 
VALUES (
	(SELECT id FROM user WHERE display_name = 'jim_bob'),
	(SELECT id FROM user WHERE display_name = 'corn_john')),
	((SELECT id FROM user WHERE display_name = 'jim_bob'),
	(SELECT id FROM user WHERE display_name = 'ben_bean')),
	((SELECT id FROM user WHERE display_name = 'ben_bean'),
	(SELECT id FROM user WHERE display_name = 'corn_john')
);

--likes_post data
INSERT INTO likes_post(user_id, post_id, date) 
VALUES (
	(SELECT id FROM user WHERE display_name = 'jim_bob'),
	(SELECT id FROM post WHERE date = '2020-10-05'),
	'2020-10-05'),
	((SELECT id FROM user WHERE display_name = 'corn_john'),
	(SELECT id FROM post WHERE date = '2020-11-10'),
	'2020-11-10'),
	((SELECT id FROM user WHERE display_name = 'ben_bean'),
	(SELECT id FROM post WHERE date = '2019-08-21'),
	'2019-08-21'
);

--hashtag_post data
INSERT INTO hashtag_post(hash_id, post_id) 
VALUES (
	(SELECT id FROM hashtag WHERE name = 'beach'),
	(SELECT id FROM post WHERE date = '2019-08-21')),
	((SELECT id FROM hashtag WHERE name = 'OSU'),
	(SELECT id FROM post WHERE date = '2020-10-05')),
	((SELECT id FROM hashtag WHERE name = 'fyp'),
	(SELECT id FROM post WHERE date = '2020-11-10')
);

/*
SELECT * FROM user;
SELECT * FROM post;
SELECT * FROM hashtag;
SELECT * FROM relationship;
SELECT * FROM likes_post;
SELECT * FROM hashtag_post;
*/