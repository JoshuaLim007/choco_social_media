--GET

--get all users

SELECT id, email, password, display_name FROM user;

    --get based on name

SELECT id, email, password, display_name FROM user WHERE display_name = :searched_Name_Input;

    --get based on id

SELECT display_name FROM user WHERE id = :searched_id;

--get all posts

SELECT id, date, text, user_id FROM post;

--get all hashtag names

SELECT id, name FROM hashtag;

    --get based on name

SELECT id, name FROM hashtag WHERE name = :searched_hashtag_name_Input;

--get all posts with that hashtag

SELECT p.*
FROM post p
JOIN hashtag_post pt ON p.id = pt.post_id
JOIN hashtag t ON pt.hash_id = t.id
WHERE t.name = :hashtag_name_Input;

--get all followers from a user

SELECT user.*
FROM user
INNER JOIN relationship ON relationship.follow_id = :user_id_input
WHERE user.id = relationship.user_id;

--get all followings from a user

SELECT user.*
FROM user
INNER JOIN relationship ON relationship.user_id = :user_id_input
WHERE user.id = relationship.follow_id;

--DELETE

--delete user
DELETE FROM likes_post WHERE user_id = :user_id_input;
DELETE FROM relationship WHERE user_id = :user_id_input;
DELETE FROM relationship WHERE follow_id = :user_id_input;
DELETE FROM post WHERE user_id = :user_id_input;
DELETE FROM user WHERE id = :user_id_input;

--delete post
DELETE FROM likes_post WHERE post_id = :post_id_input;
DELETE FROM hashtag_post WHERE post_id = :post_id_input;
DELETE FROM post WHERE id = :post_id_input;

--delete hashtag
DELETE FROM hashtag WHERE id = :hashtag_id_input;
    --delete by name
    DELETE FROM hashtag WHERE name = :hashtag_name_input;

-- INSERT

INSERT INTO user (email, password, display_name) VALUES (:EmailInput, :passwordInput, :display_nameInput);

INSERT INTO post (date, text, user_id) VALUES (:dateInput, :textInput, :post_user_idInput);

INSERT INTO hashtag (name) VALUES (:hashtagNameInput);

INSERT INTO relationship (user_id, follow_id) VALUES (:you_idInput, :following_userIdInput);

INSERT INTO likes_post (user_id, post_id, date) VALUES (:liker_user_idInput, :likedPostInput);

INSERT INTO hashtag_post (hash_id, post_id) VALUES (:hashtagIdInput, :postIdInput);




