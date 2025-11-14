<?php
	require_once("action/LogoutAction.php");

	$action = new LogoutAction();
	$data = $action->execute();

	echo json_encode($data);
