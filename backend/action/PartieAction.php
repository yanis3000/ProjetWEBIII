<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/LoginDAO.php");

    class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_POST["key"];
            $data["type"] = $_POST["type"];
			
			$result = parent::callAPI("games/auto-match", $data);

			if ($result == "JOINED_PVP" || $result="JOINED_TRAINING") {
				// $response = [
				// 	"success" => false,
				// 	"error" => "Veuillez mettre la bonne clé pour continuer"
				// ];
			}

			// else if (isset($result->key)) {
			// 	$response = [
			// 		"success" => true,
			// 		"key" => $result->key
			// 	];
			// }
            
			else if ($result == "INVALID_KEY" || $result == "INVALID_GAME_TYPE") {
				$response = [
					"success" => true,
					"key" => $result->NULL
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