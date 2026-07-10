import { AuthService } from '../services/auth.service';

const service = new AuthService();

describe('auth module', () => {
  it('logs in demo user and returns access + refresh tokens', () => {
    const result = service.login({ email: 'admin@demo-workshop.local', password: 'demo1234' });

    expect(result.user.email).toBe('admin@demo-workshop.local');
    expect(result.accessToken).toContain('.');
    expect(result.refreshToken).toContain('.');
  });
});
