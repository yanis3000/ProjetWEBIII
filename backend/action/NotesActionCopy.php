<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/NotesDAOCopy.php");

	class NotesActionCopy extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if (isset($_POST["note"]) && isset($_POST["description"])) {
				NotesDAOCopy::addAnswer($_POST["note"], $_POST["description"]);
			}

			$notes = NotesDAOCopy::getAnswers();
			
			return compact("notes");
		}
	}