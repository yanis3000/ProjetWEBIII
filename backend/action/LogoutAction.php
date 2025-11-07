<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/LoginDAO.php");

    class LogoutAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_POST["key"];
			
			$result = parent::callAPI("signout", $data);

			if ($result == "INVALID_KEY") {
				$response = [
					"success" => false,
					"error" => "Veuillez mettre la bonne clé pour continuer"
				];
			}

			else if ($result == "SIGNED_OUT") {
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