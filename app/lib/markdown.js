import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export async function getBlogByDate(date) {
  const fullPath = path.join(blogsDirectory, `${date}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      date,
      content,
      ...data
    };
  } catch (error) {
    console.error(`Error reading blog post for date ${date}:`, error);
    return null;
  }
}

export async function getAllBlogDates() {
  try {
    const fileNames = await fs.readdir(blogsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''))
      .sort((a, b) => new Date(b) - new Date(a));
  } catch (error) {
    console.error('Error reading blog dates:', error);
    return [];
  }
}

export async function getAllBlogs() {
  const dates = await getAllBlogDates();
  const blogs = await Promise.all(
    dates.map(async (date) => {
      const blog = await getBlogByDate(date);
      return {
        date,
        formattedDate: format(new Date(date), 'MMMM d, yyyy'),
        ...blog
      };
    })
  );
  return blogs.filter(blog => blog !== null);
} 