<?php
// PHP behöver session_start i början på varje sida som ska använda sessions
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
    if ($_POST['username'] === 'admin' && $_POST['password'] === 'password123') {
        $_SESSION['user'] = 'admin';  // Sätter session
        header('Location: dashboard.php');
        exit;
    } else {
        $error = "Felaktiga inloggningsuppgifter.";
    }
}
?>

<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
  <h2>Login</h2>
  <?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>
  <form method="POST" action="login.php">
    <label>Username:</label>
    <input name="username" required><br>
    <label>Password:</label>
    <input name="password" type="password" required><br>
    <button type="submit">Login</button>
  </form>
</body>
</html>

