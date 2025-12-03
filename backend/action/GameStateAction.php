<?php
    require_once("action/CommonAction.php");
    // require_once("action/DAO/LoginDAO.php");

    class GameStateAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_POST["key"];
			
			$result = parent::callAPI("games/state", $data);

			if ($result == "WAITING") {
				$response = [
					"messsage" => "En attente d'un adversaire",
				];
			}

			elseif ($result == "LAST_GAME_WON") {
				$response = [
					"message" => "Vous avez gagné la partie !",
				];
			}			
            
            elseif ($result == "LAST_GAME_LOST") {
				$response = [
					"message" => "Vous avez perdu la partie.",
				];
			}

			elseif ($result == "INVALID_KEY") {
				$response = [
					"message" => "Clé invalide",
				];
			}

			else {
				$response = $result;
			}

			return compact("response");

		}


    }