import { NextResponse } from 'next/server';

// In-memory store for likes (replace with database in production)
const likesStore = new Map();
const userLikesStore = new Map(); // Store user likes by IP (replace with proper auth in production)

export async function GET(request, { params }) {
  const { date } = params;
  const likes = likesStore.get(date) || 0;
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const hasLiked = userLikesStore.get(`${date}-${clientIp}`) || false;
  
  return NextResponse.json({ likes, hasLiked });
}

export async function POST(request, { params }) {
  const { date } = params;
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const userKey = `${date}-${clientIp}`;
  const hasLiked = userLikesStore.get(userKey) || false;
  
  let currentLikes = likesStore.get(date) || 0;
  
  if (hasLiked) {
    // Unlike
    currentLikes = Math.max(0, currentLikes - 1);
    userLikesStore.delete(userKey);
  } else {
    // Like
    currentLikes += 1;
    userLikesStore.set(userKey, true);
  }
  
  likesStore.set(date, currentLikes);
  
  return NextResponse.json({ 
    likes: currentLikes,
    hasLiked: !hasLiked
  });
} 