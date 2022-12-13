CREATE OR ALTER PROCEDURE spDeleteQuestion @question_id  VARCHAR(200) , @user_id VARCHAR(200)
AS
 BEGIN
 UPDATE Questions SET isDeleted = 1 WHERE id = @question_id AND user_id= @user_id; 
END
