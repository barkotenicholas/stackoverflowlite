CREATE
OR ALTER PROCEDURE spInsertSelectUser (
    @id VARCHAR (200),
    @firstname VARCHAR (200),
    @lastname VARCHAR (200),
    @email VARCHAR (200),
    @password VARCHAR (200)
)
AS
    BEGIN
        IF EXISTS (SELECT * FROM Users WHERE email=@email)
            BEGIN
               SELECT * FROM Users WHERE email = @email ;
            END  
        ELSE 
            BEGIN
                INSERT INTO Users (id, firstname, lastname, email, password) VALUES (@id, @firstname, @lastname, @email, @password)     
            END
    END        
