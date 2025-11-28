<?php
    require_once("action/DAO/Connection.php");
    
    class AnswerDAO {

        public static function getAnswers() {
            // Abstraction de BD
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM notes_tech");
            $statement->execute();
            $allRows = $statement->fetchAll();
            return $allRows;
        }


        public static function addAnswer($answer) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO notes_tech (notes) VALUES (:notes)");
            $statement->bindParam(':notes', $answer);
            $statement->execute();
        }


    }