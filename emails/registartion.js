const keys = require('../keys')

module.exports = function(email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Registration was successful',
    html: `
      <h1>Welcome to our shop</h1>
      <p>Your accaunt was successfuly created ${email}!</p>
      <hr />
      <a href="${keys.BASE_URL}">Courses Shop</a>
    `
  }
}