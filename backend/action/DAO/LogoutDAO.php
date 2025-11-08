<?php
    require_once("action/DAO/Connection.php");
    
    class LogoutDAO {

        public static function getAnswers() {
            // Abstraction de BD
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM stack_answers");
            $statement->execute();
            $allRows = $statement->fetchAll();
            return $allRows;
        }

    }