<?php
session_start();

// Kolla session här, annars skicka user till index
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    exit;
}

// Läs tema från cookie, om den finns
$theme = isset($_COOKIE['theme']) ? $_COOKIE['theme'] : 'light';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <?php if ($theme === 'dark') { ?>
        <style>
            body {
                background-color: #111;
                color: white;
            }
        </style>
    <?php } ?>
</head>
<body>
    <h2>Welcome to the Dashboard</h2>
    <p>You are logged in as: <strong><?php echo htmlspecialchars($_SESSION['user']); ?></strong></p>

    <p>Current theme: <strong><?php echo htmlspecialchars($theme); ?></strong></p>
    <p>
        Change theme:
        <a href="set_theme.php?mode=light">Light</a> |
        <a href="set_theme.php?mode=dark">Dark</a>
    </p>

    <p><a href="logout.php">Logout</a></p>
</body>
</html>
