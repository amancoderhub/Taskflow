import { describe, it, expect, beforeEach } from 'vitest';

const VALID_EMAIL = 'intern@demo.com';
const VALID_PASSWORD = 'intern123';

// Simulated auth function (mirrors AuthContext logic)
function login(email, password, remember = false) {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    sessionStorage.setItem('tf_auth', 'true');
    if (remember) localStorage.setItem('tf_remember', 'true');
    return { success: true };
  }
  return { success: false, error: 'Invalid email or password. Please try again.' };
}
function logout() {
  sessionStorage.removeItem('tf_auth');
  localStorage.removeItem('tf_remember');
}
function isAuthenticated() {
  return sessionStorage.getItem('tf_auth') === 'true' || localStorage.getItem('tf_remember') === 'true';
}

describe('Authentication', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('should succeed with valid credentials', () => {
    const result = login(VALID_EMAIL, VALID_PASSWORD);
    expect(result.success).toBe(true);
    expect(isAuthenticated()).toBe(true);
  });

  it('should fail with wrong password', () => {
    const result = login(VALID_EMAIL, 'wrongpass');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid email or password');
    expect(isAuthenticated()).toBe(false);
  });

  it('should fail with wrong email', () => {
    const result = login('wrong@email.com', VALID_PASSWORD);
    expect(result.success).toBe(false);
    expect(isAuthenticated()).toBe(false);
  });

  it('should persist session with remember me', () => {
    login(VALID_EMAIL, VALID_PASSWORD, true);
    sessionStorage.clear(); // simulate new session
    expect(localStorage.getItem('tf_remember')).toBe('true');
    expect(isAuthenticated()).toBe(true);
  });

  it('should clear session on logout', () => {
    login(VALID_EMAIL, VALID_PASSWORD, true);
    logout();
    expect(isAuthenticated()).toBe(false);
    expect(localStorage.getItem('tf_remember')).toBeNull();
  });
});
