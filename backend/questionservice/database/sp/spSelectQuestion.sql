CREATE OR ALTER PROCEDURE spSelectQuestion @pagenumber INT ,@pagesize INT
AS
BEGIN
 SELECT * FROM Questions WHERE isDeleted = 0 ORDER BY id OFFSET (@pagenumber -1 ) * @pagesize ROWS
 FETCH NEXT @pagesize ROWS ONLY
 ;
END

-- soft delete to trickle down from questions 