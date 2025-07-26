import { Request, Response, NextFunction } from 'express';
import { jwtVerify, JWTPayload } from 'jose';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';

if (!NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET environment variable is required');
}

const validateSessionWithNextAuth = async (sessionToken: string): Promise<any> => {
    try {
        const response = await fetch(`${FRONTEND_URL}/api/auth/session`, {
            headers: {
                'Cookie': `next-auth.session-token=${sessionToken}; __Secure-next-auth.session-token=${sessionToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const session = await response.json();
            return session.user ? session : null;
        }
        return null;
    } catch (error) {
        console.error('Session validation failed:', error);
        return null;
    }
};

export const authenticateToken = async (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = req.cookies?.['next-auth.session-token'] || 
                     req.cookies?.['__Secure-next-auth.session-token'] || 
                     null;

        if (!token) {
            console.log(' No session token found');
            return res.status(401).json({ 
                error: 'Access token required' 
            });
        }

        const session = await validateSessionWithNextAuth(token);
        
        if (!session || !session.user) {
            console.log('Session validation failed');
            return res.status(403).json({ 
                error: 'Invalid or expired session' 
            });
        }
        
        req.user = {
            id: session.user.id,
            name: session.user.name || '',
            email: session.user.email || '',
            image: session.user.image || ''
        };

        next();
    } catch (error) {
        console.error('Authentication failed:', error);
        const err = error as any;
        return res.status(403).json({ 
            error: 'Authentication failed',
            details: err?.message || 'Unknown error'
        });
    }
};

// Optional middleware for routes that can work with or without auth
export const optionalAuth = async (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = req.cookies?.['next-auth.session-token'] || 
                     req.cookies?.['__Secure-next-auth.session-token'] || 
                     null;

        if (token) {
            const session = await validateSessionWithNextAuth(token);
            
            if (session?.user) {
                req.user = {
                    id: session.user.id,
                    name: session.user.name || '',
                    email: session.user.email || '',
                    image: session.user.image || ''
                };
            }
        }
        
        next();
    } catch (error) {
        // Continue without user info if token is invalid
        next();
    }
};

export type { AuthenticatedRequest };