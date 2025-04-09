const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));

// config för secure delen
const sessionConfig = {
  name: 'secure.sid',
  secret: 'iusearchbtw',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Secure = true kräver https (cert)
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 min exp på cookie
  }
};

// middleware för secure delen
app.use(session(sessionConfig));

// "Användardatabas"
const USERS = { admin: 'password123' };

 
 // Index route: visar länkar till de olika exemplen
app.get('/', (req, res) => {
  res.send(`
    <h1>Web Session Demo</h1>
    <ul>
      <li><a href="/login">Login</a></li>
    </ul>
  `);
});

// get route på login -> visa login sida
app.get('/login', (req, res) => {
  res.send(`
    <h2>Secure Version - Login</h2>
    <form method="POST" action="/login">
      <label>Username: </label><input name="username" required /><br>
      <label>Password: </label><input name="password" type="password" required /><br>
      <button type="submit">Login</button>
    </form>
    <p>Current session ID: ${req.sessionID}</p>
    <p><a href="/">Back to index</a></p>
  `);
});

// post route för login -> tar emot login data och verifierar, regenerate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] && USERS[username] === password) {
    req.session.regenerate((err) => {
      if (err) return res.send("Error during session regeneration.");
      req.session.user = username;
      res.redirect('/dashboard');
    });
  } else {
    res.send('Invalid credentials. <a href="/login">Try again</a>');
  }
});

// dashboard som man bara når om man är inloggad
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.send(`
    <h2>Secure Version - Dashboard</h2>
    <p>Welcome, ${req.session.user}!</p>
    <p>Your new session ID: ${req.sessionID}</p>
    <p><a href="/logout">Logout</a></p>
    <p><a href="/">Back to index</a></p>
  `);
});

// korrekt logout, ta bort session
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Endpoint för att plocka ut sessionid
app.get('/session-info', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  res.json({
    user: req.session.user,
    sessionID: req.sessionID
  });
});



// Här startar vi servern, på valfri port (3000)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
