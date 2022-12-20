CREATE OR ALTER PROCEDURE spGetComments @answer_id VARCHAR(200)
AS
BEGIN
    SELECT * FROM Comments WHERE answer_id = @answer_id;
END
