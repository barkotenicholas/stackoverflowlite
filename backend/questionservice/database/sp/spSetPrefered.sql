CREATE PROCEDURE spUpdatePrefered
    @answer_id  VARCHAR(200) 
AS
BEGIN
    UPDATE Answers
    SET
        isPreferred = 1
    WHERE id=@answer_id 	
END
