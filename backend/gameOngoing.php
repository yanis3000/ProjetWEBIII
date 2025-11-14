<?php
	require_once("action/GameOngoingAction.php");

	$action = new GameOngoingAction();
	$data = $action->execute();

	echo json_encode($data);
