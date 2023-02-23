async function loginFormHandler(event) {
  event.preventDefault();

// Select values at id's user-login and password-login
  const name = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
  // Send POST request for users to api endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
      name,
      password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
    // Redirect user to map page
      document.location.replace('/dashboard');
    } else {
    // Error if not successfull
      alert(response.statusText);
    }
  }
}
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
