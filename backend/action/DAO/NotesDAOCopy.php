<?php
    require_once("action/DAO/Connection.php");
    
    class NotesDAOCopy {

        public static function getAnswers() {
            // Abstraction de BD
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM notes");
            $statement->execute();
            $allRows = $statement->fetchAll();
            return $allRows;
        }


        public static function addAnswer($note, $description) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO notes (notes, description) VALUES (:notes, :description)");
            $statement->bindParam(':notes', $note);
            $statement->bindParam(':description', $description);
            $statement->execute();
        }


    }