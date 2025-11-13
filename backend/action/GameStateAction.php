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
			
			$result = parent::callAPI("games/auto-match", $data);

			if ($result == "WAITING") {
				$response = [
					"ongoing" => true,
					"key" => $data["key"]
				];
			}

			if ($result == "LAST_GAME_WON") {
				$response = [
					"ongoing" => false,
					"key" => $data["key"]
				];
			}			
            
            if ($result == "LAST_GAME_LOST") {
				$response = [
					"ongoing" => false,
					"key" => $data["key"]
				];
			}
		
			header("Content-Type: application/json");
			echo json_encode($response);
			exit;
		}


    }