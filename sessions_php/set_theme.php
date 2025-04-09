<?php
session_start();

// Kontrollera att användaren är inloggad
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

// Läs valt tema från URL:en
$mode = $_GET['mode'] ?? 'light';

// Validera temat
if (!in_array($mode, ['light', 'dark'])) {
    header('Location: dashboard.php');
    exit;
}

// Sätt cookien för 30 dagar
setcookie('theme', $mode, time() + (60 * 60 * 24 * 30), "/");

// Skicka tillbaka användaren till dashboard
header('Location: dashboard.php');
exit;
