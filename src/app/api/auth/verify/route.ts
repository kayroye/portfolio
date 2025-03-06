import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Secret for verifying JWT tokens - must match the one used for signing
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

export async function GET(request: NextRequest) {
  try {
    // Get the auth cookie from the request
    const authCookie = request.cookies.get('blog_admin_auth');
    
    if (!authCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    try {
      // Verify the JWT token
      verify(authCookie.value, JWT_SECRET);
      return NextResponse.json({ authenticated: true });
    } catch (error) {
      console.error('Authentication verification error:', error);
      // Token is invalid or expired
      const response = NextResponse.json({ authenticated: false }, { status: 401 });
      response.cookies.delete('blog_admin_auth');
      return response;
    }
  } catch (error) {
    console.error('Authentication verification error:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Authentication verification failed' },
      { status: 500 }
    );
  }
} 