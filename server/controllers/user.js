async function getCurrentUser(req, res) {
  const currentUser = await req.user;
  res.json(currentUser);
}

module.exports = {
  getCurrentUser,
};
