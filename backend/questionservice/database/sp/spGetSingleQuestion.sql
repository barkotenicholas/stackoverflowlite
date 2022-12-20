CREATE OR ALTER PROCEDURE spGetSingleProcedure @id VARCHAR(200)
AS
BEGIN
    SELECT * FROM Questions WHERE id=@id AND isDeleted = 0
END