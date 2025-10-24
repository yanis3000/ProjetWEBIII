<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/LoginDAO.php");

    class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["username"] = "yanimosoruz";
			$data["password"] = "Jesuiscool123";
			
			$result = parent::callAPI("signin", $data);
			if ($result == "INVALID_USERNAME_PASSWORD") {
			// err 
			echo "erreur";
			}
			else {
				var_dump($result); // Pour voir les informations retournées
				exit;
			$key = $result->key;
}
		}

    }