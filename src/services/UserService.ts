import { FlussonicClient } from '../api/client';
import type { User, LoginCredentials, LoginResponse, UserSession } from '../api/types/user';
import { AuthError } from '../utils/errors';

export class UserService {
  private sessions: Map<string, UserSession> = new Map();

  constructor(private client: FlussonicClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Authenticate against Flussonic
      const isValid = await this.client.testConnection();
      
      if (!isValid) {
        throw new AuthError('Invalid credentials');
      }

      // Create user session
      const session: UserSession = {
        id: crypto.randomUUID(),
        userId: credentials.username,
        token: crypto.randomUUID(),
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        lastActivity: new Date(),
        ipAddress: '', // Should be set by the API layer
        userAgent: '' // Should be set by the API layer
      };

      this.sessions.set(session.token, session);

      return {
        user: {
          id: credentials.username,
          username: credentials.username,
          email: '',
          role: {
            id: 'admin',
            name: 'Administrator',
            permissions: ['*']
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true
        },
        token: session.token,
        expiresAt: session.expiresAt
      };
    } catch (error) {
      throw new AuthError('Authentication failed');
    }
  }

  async logout(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  async validateSession(token: string): Promise<boolean> {
    const session = this.sessions.get(token);
    if (!session) return false;

    if (new Date() > session.expiresAt) {
      this.sessions.delete(token);
      return false;
    }

    session.lastActivity = new Date();
    return true;
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    // In a real implementation, this would fetch from a database
    return ['streams.view', 'streams.manage'];
  }

  async updateUserRole(userId: string, roleId: string): Promise<void> {
    // Implementation for updating user roles
  }
}