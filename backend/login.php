<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();

	var_dump($data);
