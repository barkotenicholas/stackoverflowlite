CREATE OR ALTER PROCEDURE spEditQuestion 
    @id VARCHAR(200) = NULL,
    @user_id VARCHAR(200) = NULL,
    @question VARCHAR(200) = NULL
AS
BEGIN
 UPDATE Questions SET question = @question WHERE id = @id AND user_id = @user_id
END