<?php
	require_once("action/NotesAction.php");

	$action = new NotesAction();
	$data = $action->execute();

	var_dump($data['answers'])
?>
