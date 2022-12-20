CREATE OR ALTER PROCEDURE [dbo].[spUpdatePrefered]
    @answer_id  VARCHAR(200) , @user_id VARCHAR(200)
AS
BEGIN
    UPDATE Answers SET isPreferred = 0;
    UPDATE Answers
    SET
        isPreferred = (CASE isPreferred WHEN 1 THEN 0 ELSE 1 END)
    WHERE id=@answer_id ;
END