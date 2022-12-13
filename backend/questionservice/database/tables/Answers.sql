-- CREATE TABLE Answers (
--     id VARCHAR(200),
--     question_id VARCHAR(200),
--     user_id VARCHAR(200),
--     answer VARCHAR(200),
--     upvote INT,
--     downvote INT,
--     isDeleted INT
-- )
-- Add a new column 'NewColumnName' to table 'TableName' in schema 'SchemaName'
ALTER TABLE Answers
    ADD isPreferred int 
GO

