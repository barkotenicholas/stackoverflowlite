CREATE TABLE Votes
(
    id VARCHAR(200) PRIMARY KEY NOT NULL,
    answer_id VARCHAR(200) FOREIGN KEY REFERENCES Answers(id),
    user_id VARCHAR(200) FOREIGN KEY REFERENCES Users(id),
    likes INT NOT NULL,
    dislikes INT NOT NULL
)

DROP TABLE Votes