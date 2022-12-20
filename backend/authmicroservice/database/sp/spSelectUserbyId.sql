CREATE
OR ALTER PROCEDURE spSelectUserId
        (@id VARCHAR(200)) AS
            BEGIN
SELECT *
FROM Users
WHERE id
= @id
END