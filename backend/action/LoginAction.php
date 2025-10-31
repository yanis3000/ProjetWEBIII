<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/LoginDAO.php");

    class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["username"] = $_POST["username"];
			$data["password"] = $_POST["password"];
			
			$result = parent::callAPI("signin", $data);
			if ($result == "INVALID_USERNAME_PASSWORD") {
				echo "Erreur : Nom d'utilisateur ou le mot de passe ne fonctionne pas";
			}
			else {
				var_dump($result); // Pour voir les informations retournées
				exit;
				$key = $result->key;
			}
		}

    }