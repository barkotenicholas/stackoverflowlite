CREATE
OR ALTER PROCEDURE spInsertQuestion
    @id VARCHAR(200) = NULL,
    @user_id VARCHAR(200) = NULL,
    @question VARCHAR(200) = NULL,
    @qdate DATE = NULL
AS
BEGIN
    IF EXISTS(SELECT *
    FROM Questions
    WHERE id=@id AND isDeleted = 0)
        BEGIN
        UPDATE Questions SET isDeleted=1 WHERE id=@id
    END
    ELSE
    BEGIN
        INSERT INTO Questions
            (id, user_id, question, qdate, isDeleted)
        VALUES
            (@id, @user_id, @question, @qdate, 0)
    END
END
-- update 