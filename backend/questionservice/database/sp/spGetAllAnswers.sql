CREATE OR ALTER PROCEDURE spGetAllAnswers @question_id VARCHAR(200)
AS
 BEGIN
 SELECT * FROM Answers WHERE question_id = @question_id;
END
