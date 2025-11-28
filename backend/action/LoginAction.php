<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/LoginDAO.php");

    class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data["username"] = $_POST["username"];
			$data["password"] = $_POST["password"];
			
			$result = parent::callAPI("signin", $data);

			if ($result == "INVALID_USERNAME_PASSWORD") {
				$response = [
					"success" => false,
					"error" => "Informations invalides"
				];
			}

			else if (isset($result->key)) {
				$response = [
					"success" => true,
					"key" => $result->key
				];
			}
			else {
				$response = [
					"success" => false,
					"error" => "Erreur inconnue"
				];
			}
		
			return compact("response");

		}


    }