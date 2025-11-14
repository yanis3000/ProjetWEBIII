<?php
	require_once("action/GameStateAction.php");

	$action = new GameStateAction();
	$data = $action->execute();

	echo json_encode($data);
