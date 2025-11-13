<?php
    require_once("action/CommonAction.php");
    // require_once("action/DAO/LoginDAO.php");

    class GameOngoingAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_POST["key"];
            $data["type"] = $_POST["type"];
            $data["uid"] = $_POST["uid"];
            $data["targetuid"] = $_POST["targetuid"];

			
			$result = parent::callAPI("games/auto-match", $data);

			if ($result == "INVALID_KEY") {
				$response = [
					"errorMessage" => "Clé invalide"
				];
			}

            else if ($result == "INVALID_ACTION") {
				$response = [
					"errorMessage" => "Action invalide"
				];
			}

            else if ($result == "ACTION_IS_NOT_AN_OBJECT") {
				$response = [
					"errorMessage" => "Mauvaise structure de données"
				];
			}

            else if ($result == "NOT_ENOUGH_ENERGY") {
				$response = [
					"errorMessage" => "La carte coûte trop cher à jouer"
				];
			}

            else if ($result == "BOARD_IS_FULL") {
				$response = [
					"errorMessage" => "Pas assez de place pour la carte"
				];
			}

            else if ($result == "CARD_NOT_IN_HAND") {
				$response = [
					"errorMessage" => "La carte n’est pas dans votre main"
				];
			}

            else if ($result == "CARD_IS_SLEEPING") {
				$response = [
					"errorMessage" => "Carte ne peut être jouée ce tour-ci"
				];
			}
            

            else if ($result == "MUST_ATTACK_TAUNT_FIRST") {
				$response = [
					"errorMessage" => "Une carte taunt empêche ce coup"
				];
			}


            else if ($result == "OPPONENT_CARD_NOT_FOUND") {
				$response = [
					"errorMessage" => "La carte attaquée n’est pas présente"
				];
			}


            else if ($result == "OPPONENT_CARD_HAS_STEALTH") {
				$response = [
					"errorMessage" => "La carte ne peut être attaquée tant qu’elle possède « stealth »"
				];
			}


            else if ($result == "ERROR_PROCESSING_ACTION") {
				$response = [
					"errorMessage" => "La carte cherchée (uid) n’est pas présente"
				];
			}

            else if ($result == "INTERNAL_ACTION_ERROR") {
				$response = [
					"errorMessage" => "Erreur interne, ne devrait pas se produire"
				];
			}

            else if ($result == "TOO_MANY_ACTIONS") {
				$response = [
					"errorMessage" => "Autre erreur interne, bug du prof?"
				];
			}

            else if ($result == "TOO_MANY_ACTIONS_BAN") {
				$response = [
					"errorMessage" => "Pouvoir déjà utilisé pour ce tour"
				];
			}

            else if ($result == "HERO_POWER_ALREADY_USED") {
				$response = [
					"errorMessage" => "Délai trop court entre 2 actions"
				];
			}
		
			header("Content-Type: application/json");
			echo json_encode($response);
			exit;
		}


    }