import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

// Secret for signing JWT tokens - in production, use a strong, unique value
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_DB_KEY;

    // Validate that the admin password is set
    if (!adminPassword) {
      console.error('ADMIN_DB_KEY environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Check if password matches
    if (password === adminPassword) {
      // Create a JWT token
      const token = sign(
        { 
          authorized: true,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
        },
        JWT_SECRET
      );

      // Set a secure HTTP-only cookie using the response object
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'blog_admin_auth',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    // If password doesn't match
    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
} 