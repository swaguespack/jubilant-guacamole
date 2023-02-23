async function signupFormHandler(event) {
  event.preventDefault();

// Select values at id's user-signup, email-signup, and password-signup
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
  // Send POST request for users to api endpoint
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({
      name,
      email,
      password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
    // Redirect user to dashboard page
      document.location.replace('/dashboard');
    } else {
    // Error if not successfull
      alert(response.statusText);
    }
  }
}
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
