CREATE OR
ALTER PROCEDURE spInsertUpdateVotes

(
    @id VARCHAR(200),
    @answer_id VARCHAR(200),
    @user_id VARCHAR(200),
    @like INT,
    @dislikes INT
)
AS BEGIN
    SET NOCOUNT ON;
    IF  EXISTS(SELECT * FROM Votes WHERE answer_id = @answer_id AND user_id=@user_id)
        BEGIN 
            UPDATE Votes SET likes =@like , dislikes = @dislikes WHERE user_id = @user_id
            END
    ELSE BEGIN
        INSERT INTO Votes (id,answer_id,user_id,likes,dislikes) VALUES (@id,@answer_id,@user_id,@like,@dislikes)
        END
END                