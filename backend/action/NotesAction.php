<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/AnswerDAO.php");

	class NotesAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if (isset($_POST["author"]) && isset($_POST["answer"])) {
				AnswerDAO::addAnswer($_POST["author"], $_POST["answer"]);
			}

			$answers = AnswerDAO::getAnswers();
			
			return compact("answers");
		}
	}