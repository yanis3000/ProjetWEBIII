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

			return compact("result");

		// 	if ($result == "WAITING") {
		// 		$response = [
		// 			"ongoing" => "WAITING",
		// 		];
		// 	}

		// 	elseif ($result == "LAST_GAME_WON") {
		// 		$response = [
		// 			"ongoing" => "GAME WON",
		// 		];
		// 	}			
            
        //     elseif ($result == "LAST_GAME_LOST") {
		// 		$response = [
		// 			"ongoing" => "GAME LOST",
		// 		];
		// 	}

		// 	else {
		// 		$response = [
		// 			$result
		// 		];
		// 	}

		// 	header("Content-Type: application/json");
		// 	echo json_encode($response);
		// 	exit;
		}


    }