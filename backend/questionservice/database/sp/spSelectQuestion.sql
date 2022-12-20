CREATE OR ALTER PROCEDURE spSelectQuestion 
AS
BEGIN
 SELECT * FROM Questions WHERE isDeleted = 0;
END

-- soft delete to trickle down from questions 