import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response that deletes the auth cookie
    const response = NextResponse.json({ success: true });
    
    // Delete the auth cookie
    response.cookies.delete('blog_admin_auth');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
} 