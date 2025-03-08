-- Create organizations table
CREATE TABLE organizations (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create channels table with organization association
CREATE TABLE channels (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  organization_id INT,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create messages table with foreign key references to users and channels
CREATE TABLE messages (
  id INT PRIMARY KEY,
  user_id INT NOT NULL,
  channel_id INT NOT NULL,
  post_time DATETIME NOT NULL,
  content VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (channel_id) REFERENCES channels(id)
);

-- Create channel_members join table with a composite primary key
CREATE TABLE channel_members (
  user_id INT NOT NULL,
  channel_id INT NOT NULL,
  PRIMARY KEY (user_id, channel_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (channel_id) REFERENCES channels(id)
);

-- Create organization_members join table with a composite primary key
CREATE TABLE organization_members (
  user_id INT NOT NULL,
  organization_id INT NOT NULL,
  PRIMARY KEY (user_id, organization_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);


-- Inserting values into the tables 

INSERT INTO organizations (id, name)
VALUES (1, 'Lambda School');

INSERT INTO users (id, name)
VALUES 
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Chris');

INSERT INTO channels (id, name, organization_id)
VALUES 
  (1, '#general', 1),
  (2, '#random', 1);

INSERT INTO organization_members (user_id, organization_id)
VALUES 
  (1, 1),
  (2, 1),
  (3, 1);

INSERT INTO channel_members (user_id, channel_id)
VALUES 
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 2);


INSERT INTO messages (id, user_id, channel_id, post_time, content)
VALUES 
  (1, 1, 1, NOW() + INTERVAL 0 SECOND, 'Alice: Hello in #general'),
  (2, 1, 2, NOW() + INTERVAL 1 SECOND, 'Alice: Hello in #random'),
  (3, 2, 1, NOW() + INTERVAL 2 SECOND, 'Bob: Hi in #general'),
  (4, 3, 2, NOW() + INTERVAL 3 SECOND, 'Chris: Hi in #random'),
  (5, 1, 1, NOW() + INTERVAL 4 SECOND, 'Alice: How is everyone in #general?'),
  (6, 2, 1, NOW() + INTERVAL 5 SECOND, 'Bob: Doing well in #general.'),
  (7, 3, 2, NOW() + INTERVAL 6 SECOND, 'Chris: Enjoying #random chat.'),
  (8, 1, 2, NOW() + INTERVAL 7 SECOND, 'Alice: Another message in #random.'),
  (9, 2, 1, NOW() + INTERVAL 8 SECOND, 'Bob: Quick update in #general.'),
  (10, 3, 2, NOW() + INTERVAL 9 SECOND, 'Chris: Final message in #random.'),
  (11, 1, 1, NOW() + INTERVAL 1 SECOND, 'Alice: Checking in on #general.'),
  (12, 2, 2, NOW() + INTERVAL 2 SECOND, 'Bob: Replying to Alice in #random.'),
  (13, 3, 1, NOW() + INTERVAL 3 SECOND, 'Chris: Sharing a joke in #general.'),
  (14, 1, 2, NOW() + INTERVAL 4 SECOND, 'Alice: Laughing at Chris''s joke in #random.'),
  (15, 2, 1, NOW() + INTERVAL 5 SECOND, 'Bob: Announcing a meeting in #general.'),
  (16, 3, 2, NOW() + INTERVAL 6 SECOND, 'Chris: Responding to meeting announcement in #random.'),
  (17, 1, 1, NOW() + INTERVAL 7 SECOND, 'Alice: Confirming attendance in #general.'),
  (18, 2, 2, NOW() + INTERVAL 8 SECOND, 'Bob: Sharing meeting agenda in #random.'),
  (19, 3, 1, NOW() + INTERVAL 9 SECOND, 'Chris: Commenting on agenda in #general.'),
  (20, 1, 2, NOW() + INTERVAL 10 SECOND, 'Alice: Discussing agenda points in #random.'),
  (21, 2, 1, NOW() + INTERVAL 11 SECOND, 'Bob: Providing updates in #general.'),
  (22, 3, 2, NOW() + INTERVAL 12 SECOND, 'Chris: Asking questions in #random.'),
  (23, 1, 1, NOW() + INTERVAL 13 SECOND, 'Alice: Answering questions in #general.'),
  (24, 2, 2, NOW() + INTERVAL 14 SECOND, 'Bob: Sharing resources in #random.'),
  (25, 3, 1, NOW() + INTERVAL 15 SECOND, 'Chris: Thanking Bob in #general.'),
  (26, 1, 2, NOW() + INTERVAL 16 SECOND, 'Alice: Introducing new topic in #random.'),
  (27, 2, 1, NOW() + INTERVAL 17 SECOND, 'Bob: Discussing new topic in #general.'),
  (28, 3, 2, NOW() + INTERVAL 18 SECOND, 'Chris: Sharing insights in #random.'),
  (29, 1, 1, NOW() + INTERVAL 19 SECOND, 'Alice: Wrapping up discussion in #general.'),
  (30, 2, 2, NOW() + INTERVAL 20 SECOND, 'Bob: Summarizing points in #random.');
  
  select * from channels;
  select * from organizations;
  select * from users;
  select * from  organization_members;
  select * from channel_members;
  select * from messages;
  
-- 1. List all organization names.
  select name as "Organization Name" from organizations;
-- 2. List all channel names.
  select name from channels;
-- 3. List all channels in a specific organization by organization name.
  select o.name as "Organization Name" , c.name as "Channel Name"  from organizations o left join channels c on o.id = c.organization_id ;
-- 4. List all messages in a specific channel by channel name (#general) in order of post_time, descending.
  select m.content, c.name as Channel, m.post_time from messages m left  join channels c on m.channel_id = c.id where c.name = "#general" order by post_time desc;
-- 5. List all channels to which user Alice belongs.
  select c.name as "Channel List" from users u left join channel_members cm on u.id = cm.user_id left join channels c on  c.id = cm.channel_id where u.name = "Alice" ; 
-- 6. List all users that belong to channel #general.
  select u.name  from channel_members cm left join users u on u.id = cm.user_id left join channels c on c.id = cm.channel_id where c.name = "#general";
-- 7. List all messages in all channels by user Alice.
  select m.id , m.content , m.channel_id, m.post_time from messages m  left join users u on u.id = m.user_id where u.name = "Alice";
-- 8. List all messages in #random by user Bob.
  select m.id , m.content, m.post_time from messages m  left join users u on u.id = m.user_id left join channels c on m.channel_id = c.id where u.name = "Bob" and c.name = "#random";
-- 9. List the count of messages across all channels per user (with the user's name column titled "User Name" and the count column titled "Message Count", and user names in reverse alphabetical order).
  select u.name as "User Name", count(m.content) as "Message Count" from messages m  left join users u on m.user_id = u.id group by m.user_id;
-- 10. [Stretch!] List the count of messages per user per channel.
  select c.name as "Channel Name" , count(m.content) as "Message Count" from messages m  left join channels c on m.channel_id = c.id group by m.channel_id;

--What SQL keywords or concept would you use if you wanted to automatically delete all messages by a user if that user were deleted from the user table?
-- ON DELETE CASCADE


