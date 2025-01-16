export const login_data = {
    login_pageUrl: 'https://practicetestautomation.com/practice-test-login/',
    username: 'student',
    password: 'Password123',
    user_logged_in_successfully_Url: /.*logged-in-successfully/,
    user_not_logged_in: /.*practice-test-login/,
    
    username_Password_Data: [
      { username: 'Test', password: '12345' },
      { username: 'test', password: 'QA1234' },
      { username: 'gatester', password: 'ts123' }
    ]
  };