<?php
session_start();
session_unset();     // Tar bort alla session-variabler
session_destroy();   // Förstör sessionen

header('Location: index.php');
exit;
?>
