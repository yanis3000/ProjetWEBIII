<?php
    require_once("action/DAO/Connection.php");
    
    class AnswerDAO {

        public static function getAnswers() {
            // Abstraction de BD
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM stack_answers");
            $statement->execute();
            $allRows = $statement->fetchAll();
            return $allRows;
        }


        public static function addAnswer($author, $answer) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO stack_answers (author, answer) VALUES (:author, :answer)");
            $statement->bindParam(':author', $author);
            $statement->bindParam(':answer', $answer);
            $statement->execute();
        }


    }