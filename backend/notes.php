<?php
	require_once("action/NotesAction.php");

	$action = new NotesAction();
	$data = $action->execute();

	echo json_encode($data);
?>
