import db from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET /api/blogs - List posts (with optional search query)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();

  await db.read();
  let posts = db.data.posts || [];

  if (query) {
    posts = posts.filter((post) => post.heading.toLowerCase().includes(query));
  }

  return NextResponse.json(posts);
}

// Helper function to create a slug from the heading
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// POST /api/blogs - Create a new post with slugified id
export async function POST(request) {
  try {
    const newPost = await request.json();

    // Generate slug from the post heading
    let slug = slugify(newPost.heading);

    // Read the current database contents
    await db.read();
    db.data ||= { posts: [] };

    // Ensure uniqueness: if a post with the same slug exists, append a timestamp
    if (db.data.posts.some((post) => post.id === slug)) {
      slug = `${slug}-${Date.now()}`;
    }
    newPost.id = slug;

    // Add the new post
    db.data.posts.push(newPost);

    // Write back to the JSON file
    await db.write();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
