<?php
	require_once("action/NotesActionCopy.php");

	$action = new NotesActionCopy();
	$data = $action->execute();


	echo json_encode($data);
?>
