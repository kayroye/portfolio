import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getPostData } from '@/utils/blog';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return new Response('Slug parameter is required', { status: 400 });
    }

    // Fetch the blog post data
    const post = await getPostData(slug);
    
    if (!post) {
      return new Response('Blog post not found', { status: 404 });
    }

    // Load the font from Google Fonts
    const interRegular = fetch(
      new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_0ew.woff')
    ).then((res) => res.arrayBuffer());

    const interBold = fetch(
      new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_0ew.woff')
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'black',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            overflow: 'hidden',
          }}
        >
          {/* Terminal Header with colored circles */}
          <div
            style={{
              padding: '24px 48px',
              backgroundColor: 'black',
              borderBottom: '1px solid rgba(74, 222, 128, 0.3)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', marginRight: '32px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#4ade80' }}></div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: '24px', fontWeight: 500, color: '#4ade80' }}>
              kalanroye.com/blog
            </div>
            <div style={{ width: '72px' }}></div>
          </div>
          
          {/* Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '64px',
            }}
          >
            <div style={{ fontSize: '32px', fontFamily: 'Inter', fontWeight: 400, color: '#86efac', marginBottom: '48px' }}>
              Kalan Roye&apos;s Blog
            </div>
            <div style={{ fontSize: '48px', fontFamily: 'Inter', fontWeight: 700, color: '#4ade80', textAlign: 'center', maxWidth: '900px' }}>
              {post.title}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await interRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: await interBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
} 