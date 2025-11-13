<?php
	require_once("action/GameOngoingAction.php");

	$action = new GameOngoingAction();
	$data = $action->execute();

	var_dump($data);
