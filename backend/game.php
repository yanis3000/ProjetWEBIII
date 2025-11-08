<?php
	require_once("action/GameAction.php");

	$action = new GameAction();
	$data = $action->execute();

	var_dump($data);
