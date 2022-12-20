CREATE TABLE Comments (
    id VARCHAR(200) PRIMARY KEY NOT NULL,
    answer_id VARCHAR(200) FOREIGN KEY REFERENCES Answers(id) NOT NULL,
    user_id VARCHAR(150) FOREIGN KEY REFERENCES Users(id) NOT NULL,
    comment VARCHAR(200) NOT NULL,
    isDeleted INT NOT NULL
)

-- DROP TABLE Comments