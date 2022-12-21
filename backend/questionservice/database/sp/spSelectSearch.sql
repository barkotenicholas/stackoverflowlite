CREATE OR
ALTER PROCEDURE spSelectSearch
    @question VARCHAR(200)
AS
BEGIN
        SELECT *
        FROM Questions
        WHERE question LIKE '%' + @Question + '%' AND isDeleted = 0
END