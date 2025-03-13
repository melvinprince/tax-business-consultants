import { join } from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { NextResponse } from "next/server";

// Helper function to create a new lowdb instance (for a single post endpoint)
async function getDb() {
  const file = join(process.cwd(), "data", "db.json");
  const adapter = new JSONFile(file);
  const db = new Low(adapter, { posts: [] });
  await db.read();
  db.data ||= { posts: [] };
  return db;
}

// Utility function to create a slug from a string
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// GET /api/blogs/[id] - Get a single post
export async function GET(request, { params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;
  const db = await getDb();
  const post = db.data.posts.find((p) => p.id.toString() === id);
  if (!post) {
    return new Response("Post not found", { status: 404 });
  }
  return new Response(JSON.stringify(post), { status: 200 });
}

// PUT /api/blogs/[id] - Update a post
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updatedPost = await request.json();

    const db = await getDb();
    const index = db.data.posts.findIndex((p) => p.id.toString() === id);

    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const existingPost = db.data.posts[index];

    // Check if the heading was updated
    if (updatedPost.heading && updatedPost.heading !== existingPost.heading) {
      // Generate a new slug
      let newSlug = slugify(updatedPost.heading);

      // Ensure uniqueness by checking other posts (excluding the current one)
      const isSlugTaken = db.data.posts.some(
        (p) => p.id === newSlug && p.id.toString() !== id
      );
      if (isSlugTaken) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      // Set the new slug as the post id
      updatedPost.id = newSlug;
    }

    // Merge the existing post with the updated data
    db.data.posts[index] = { ...existingPost, ...updatedPost };

    await db.write();

    return NextResponse.json(db.data.posts[index]);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] - Delete a post
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const db = await getDb();
    const initialLength = db.data.posts.length;
    db.data.posts = db.data.posts.filter((p) => p.id.toString() !== id);

    if (db.data.posts.length === initialLength) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await db.write();
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
