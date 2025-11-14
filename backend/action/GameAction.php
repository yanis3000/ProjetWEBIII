<?php
    require_once("action/CommonAction.php");
    // require_once("action/DAO/LoginDAO.php");

    class GameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_POST["key"];
            $data["type"] = $_POST["type"];
			
			$result = parent::callAPI("games/auto-match", $data);

			if ($result == "JOINED_PVP") {
				$response = [
					"success" => true,
					"key" => $data["key"],
					"type" => "PVP"
				];
			}

			else if ($result == "JOINED_TRAINING") {
				$response = [
					"success" => true,
					"key" => $data["key"],
					"type" => "TRAINING"
				];
			}
            
			else if ($result == "INVALID_KEY") {
				$response = [
					"success" => false,
					"error" => "Clé invalide"
				];
			}

			else if ($result == "INVALID_GAME_TYPE") {
				$response = [
					"success" => false,
					"error" => "Type de jeu invalide"
				];
			}

			else {
				$response = [
					"success" => false,
					"error" => "Erreur inconnue"
				];
			}
		
			header("Content-Type: application/json");
			echo json_encode($response);
			exit;
		}


    }