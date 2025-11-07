<?php
	require_once("action/LogoutAction.php");

	$action = new LogoutAction();
	$data = $action->execute();

	var_dump($data);
