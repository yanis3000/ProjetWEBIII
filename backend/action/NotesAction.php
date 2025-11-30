<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/NotesDAO.php");

	class NotesAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if (isset($_POST["note"])) {
				NotesDAO::addAnswer($_POST["note"]);
			}

			$notes = NotesDAO::getAnswers();
			
			return compact("notes");
		}
	}