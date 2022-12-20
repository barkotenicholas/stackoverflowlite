CREATE OR ALTER PROCEDURE spSelectSingleUserQuestions
    @user_id VARCHAR(200)
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE user_id =@user_id AND isDeleted = 0
END