import { useState } from 'react';

import './styles.css';

/*
  Build a user Signup form in React with the following features.

  1. An email and a password input
  2. Email must have an “@” and the domain side must include a “.”
  3. Password must include
      1.  at least one special character
      2. one number and be at least 8 characters
  4. Submission request handling  
    1. Utilze the mock API function to handle submissions
  5. Basic aesthetics with pure CSS
*/

const MIN_PASSWORD_LENGTH = 8;

function API(data) {
  return new Promise((res) => {
    setTimeout(
      () =>
        res({
          success: "Your Account has been successfully created!",
          error: "Username is taken",
        }),
      1000
    );
  });
};

const isValidEmail = email => {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  if (!EMAIL_REGEX.test(email)) {
    return false;
  };

  return true;
};

const isValidPassword = password => {
  const specialCharacters = ["@", "#", "$", "%", "!"];

  if (
    password.length > MIN_PASSWORD_LENGTH &&
    !Array.from(password).every(char => isNaN(char)) &&
    specialCharacters.some(char => password.includes(char))
  ) {
    return true;
  };

  return false;
};

export default function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  return (
    <div className="App">
      <h1>Sign Up</h1>

      <form
        className='Form'
        onSubmit={async e => {
          e.preventDefault();

          setStatus(null);
          setError(null);

          if (!isValidEmail(email)) {
            setStatus('ERROR');
            setError(`Email provided is not valid.`);

            return;
          };

          if (!isValidPassword(password)) {
            setStatus('ERROR');
            setError(`Password must contain at least ${MIN_PASSWORD_LENGTH} characters, one number and one special character.`);

            return;
          };

          const response = await API(email, password);
          if (response.error) {
            setStatus('ERROR');
            setError(response.error);
          } else {
            setStatus('SIGNED_UP');
          };
        }}
      >
        <label className='Label'>
          Email

          <input
            className='Input'
            name="emailInput"
            onChange={event => {
              setError(null);
              setStatus(null);

              setEmail(event.target.value);
            }}
            required
            type="text"
            value={email}
          />
        </label>

        <label className='Label'>
          Password

          <input
            className='Input'
            name="passwordInput"
            onChange={(event) => {
              setError(null);
              setStatus(null);
  
              setPassword(event.target.value);
            }}
            required
            type="password"
            value={password}
          />
        </label>

        <input type="submit" value="Sign Up" />
      </form>

      <span>
        {
          status === 'SIGNED_UP' ?
            <h3>Successfully Signed Up</h3> :

          status === 'ERROR' ?
            <h3>{ error }</h3> :

          null
        }
      </span>
    </div>
  );
};
