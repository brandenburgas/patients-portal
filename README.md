# Phrasee Technical Test - Front End

This test should take overall no longer than 3 hours. Should you find yourself taking longer please submit what you have, with a note indicating how you would finish the task.

Please clone this repository in order to work on it. 

To submit, email our HR dept at peopleteam@phrasee.co please remember to include your name. Your email should include any notes that you may have for our consideration, along with either a zip file of your updated version of the application, or a link to a GitHub repository containing the updated application.

## Task
Your task is to develop a mini React application, consisting of a simple login form for a fictitious medical records app.

Please complete the functionality of the app and change the code in accordance with your understanding of **best practices**.

Feel free to use any technology available in the React environment to achieve the results and do any change you deem needed.

## Design
The login page should look like the following image, but doesn't have to be pixel perfect.
![image](https://github.com/PhraseePhoundry/front-end-test/assets/81157604/aaf4a45c-dddf-4293-921c-e22eaee9b9e4)

The patient page should look like the following image:
![image](https://github.com/PhraseePhoundry/front-end-test/blob/develop/digital-hospital-global-patients.jpg)

## Requirements

1. Validate input fields:
    - username:
        - matching email address pattern only
        - max 128 characters between '@' and '.'
        - max 6 characters after last '.' character
    - password:
        - alphanumeric only
        - min 8 characters
        - max 128 characters
        - at least one number
        - at least one capital letter
2.  Allow logging in based on the response from this API endpoint:
    https://run.mocky.io/v3/3c2a2fcf-6148-48b9-aa81-0b8b3ac75fbc
    The payload should be a JSON object of the form
    {
        "username": "test.user@phrasee.co",
        "password": "testpassword"
    }
   
3.  After a successful response has been received, use it to render a page listing hospital patients following the design attached in 'digital-hospital-global-patients.jpg'.
4.  This page should not be available to users who are 'unauthenticated'. Those users should be presented with the login page instead.
5.  Favor the use Redux to manage the some of the state of the app.
6.  Group patients by the "type" property and display users only whose "is_completed" value is false.
7.  Please sort users ascending within groups by "last_visit_date" or alphabetically if dates are the same.
8.  Add tests to the most crucial parts of the application logic (Testing-library/Jest preferable)

# Considerations

- New routes could be added in the future, some routes will require that the user has been authenticated
- Some common data may need to be accessed by future components.
- Styling code should be reusable in the future.
- Use whatever CSS styling you want.
- Potential future code changes should introduce minimal regression bugs without developers being aware
