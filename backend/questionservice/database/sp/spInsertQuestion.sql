CREATE
OR ALTER PROCEDURE spInsertQuestion
    @id VARCHAR(200),
    @user_id VARCHAR(200),
    @question VARCHAR(200),
    @qdate DATE
AS
BEGIN
    IF EXISTS(SELECT *
    FROM Questions
    WHERE id=@id)
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