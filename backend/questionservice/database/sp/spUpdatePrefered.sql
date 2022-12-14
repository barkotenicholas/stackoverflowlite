CREATE OR ALTER PROCEDURE [dbo].[spUpdatePrefered]
    @answer_id  VARCHAR(200),
    @user_id VARCHAR(150)
AS
BEGIN
    UPDATE Answers
    SET
        isPreferred = 1
    WHERE id=@answer_id AND user_id =@user_id 	
END