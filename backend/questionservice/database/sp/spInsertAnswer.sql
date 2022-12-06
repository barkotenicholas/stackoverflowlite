CREATE OR ALTER PROCEDURE spInsertAnswer @id VARCHAR(200), @question_id VARCHAR(200),@user_id VARCHAR(200),@answer VARCHAR(200),@upvote INT,@downvote INT 
AS
 BEGIN
 INSERT INTO Answers (id,question_id,user_id,answer,upvote,downvote,isDeleted) VALUES (@id,@question_id,@user_id,@answer,@upvote,@downvote,0)
END
    