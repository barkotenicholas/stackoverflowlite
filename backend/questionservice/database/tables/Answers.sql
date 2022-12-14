CREATE TABLE Answers (
    id VARCHAR(200) PRIMARY KEY NOT NULL,
    question_id VARCHAR(200) FOREIGN KEY REFERENCES Questions(id),
    user_id VARCHAR(150) FOREIGN KEY REFERENCES Users(id),
    answer VARCHAR(200) NOT NULL ,
    isPreferred BIT NOT NULL DEFAULT 0,
    isDeleted BIT NOT NULL DEFAULT 0
)
-- Add a new column 'NewColumnName' to table 'TableName' in schema 'SchemaName'
-- ALTER TABLE Answers
--     ADD isPreferred int 
-- GO

DROP TABLE Answers
