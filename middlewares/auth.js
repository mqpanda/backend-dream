export function homeHandler(req, res) {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}

export function profileHandler(req, res) {
  res.send(JSON.stringify(req.oidc.user));
}

export function logoutHandler(req, res) {
  req.logout();
  res.redirect('/');
}
