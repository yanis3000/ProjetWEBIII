<?php
	require_once("action/GameStateAction.php");

	$action = new GameStateAction();
	$data = $action->execute();

	var_dump($data);
