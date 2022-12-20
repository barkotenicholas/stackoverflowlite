CREATE OR ALTER PROCEDURE spInsertAnswer
    @id VARCHAR(200),
    @question_id VARCHAR(200),
    @user_id VARCHAR(200),
    @answer VARCHAR(200)
AS
BEGIN
    INSERT INTO Answers
        (id,question_id,user_id,answer,isDeleted,isPreferred)
    VALUES
        (@id, @question_id, @user_id, @answer,0, 0)
END
    