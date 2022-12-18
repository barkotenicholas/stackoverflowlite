CREATE OR ALTER PROC spGetMostAnsweredQuestion
    @scope INT
AS
BEGIN
    SELECT [Questions].[id]
    FROM [StackOverflow].[dbo].[Questions] JOIN [StackOverflow].[dbo].[Answers] ON [Questions].[id] = [Answers].[question_id]
    GROUP BY [Questions].[id]
    HAVING COUNT([Questions].[id]) >= @scope
END