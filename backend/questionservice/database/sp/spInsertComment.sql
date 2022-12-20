CREATE OR ALTER PROCEDURE spInsertComment @id VARCHAR(200) , @answer_id VARCHAR(200),@user_id VARCHAR(200),@comment VARCHAR(200)
AS
 BEGIN
  INSERT INTO Comments (id,answer_id,user_id,comment,isDeleted) VALUES(@id,@answer_id,@user_id,@comment,0)
    
END