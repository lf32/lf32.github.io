import { NextResponse } from 'next/server';

// In-memory store for comments (replace with database in production)
const commentsStore = new Map();

export async function GET(request, { params }) {
  const { date } = params;
  const comments = commentsStore.get(date) || [];
  
  return NextResponse.json({ comments });
}

export async function POST(request, { params }) {
  const { date } = params;
  const { author, content, parentId = null } = await request.json();
  
  if (!author || !content) {
    return NextResponse.json(
      { error: 'Author and content are required' },
      { status: 400 }
    );
  }

  const comment = {
    id: Date.now().toString(),
    author,
    content,
    parentId,
    date: new Date().toISOString(),
    likes: 0,
    replies: []
  };

  const comments = commentsStore.get(date) || [];
  
  if (parentId) {
    // Add reply to parent comment
    const parentComment = comments.find(c => c.id === parentId);
    if (parentComment) {
      parentComment.replies.push(comment);
    }
  } else {
    // Add new top-level comment
    comments.push(comment);
  }
  
  commentsStore.set(date, comments);
  
  return NextResponse.json({ comment });
}

// Optional: Add DELETE endpoint for comment moderation
export async function DELETE(request, { params }) {
  const { date } = params;
  const { commentId } = await request.json();
  
  const comments = commentsStore.get(date) || [];
  const updatedComments = comments.filter(c => c.id !== commentId);
  
  commentsStore.set(date, updatedComments);
  
  return NextResponse.json({ success: true });
} 