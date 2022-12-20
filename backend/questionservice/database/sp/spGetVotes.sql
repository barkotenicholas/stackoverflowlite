CREATE OR ALTER PROCEDURE spGetVotes @answer_id VARCHAR(200)
AS
BEGIN 
SELECT SUM([likes]) as TotalLikes
      ,SUM([dislikes]) as TotalDislikes
	  FROM [StackOverflow].[dbo].[Votes] WHERE answer_id =@answer_id
END
