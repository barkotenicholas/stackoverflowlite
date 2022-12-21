CREATE OR ALTER PROC spGetMostAnsweredQuestion
AS
BEGIN
    SELECT [Questions].[id]
    FROM [StackOverflow].[dbo].[Questions] LEFT JOIN [StackOverflow].[dbo].[Answers] ON [Questions].[id] = [Answers].[question_id]
    GROUP BY [Questions].[id]
    HAVING COUNT([Questions].[id]) > 0 ORDER BY COUNT([Questions].[id]) DESC
END