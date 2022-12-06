CREATE
OR ALTER PROCEDURE spSelectUser
    (@email VARCHAR(200))
AS
BEGIN
    SELECT *
    FROM Users
    WHERE email = @email
END