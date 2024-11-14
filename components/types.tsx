// Define the Post type with all necessary properties
export interface Post {
    id: string;
    title: string;
    tags: string[];
    image_url?: string;
    paragraph?: string;
    authorImage?: string;
    authorName?: string;
  }
  