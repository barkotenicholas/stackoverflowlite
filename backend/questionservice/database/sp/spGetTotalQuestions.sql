CREATE OR ALTER PROCEDURE spGetTotalQuestions 
AS
BEGIN
    SELECT COUNT(id) as total FROM Questions WHERE isDeleted =0;
END