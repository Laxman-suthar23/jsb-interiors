// ─── Shared types for project data ─────────────────────────────────

export interface ProjectImage {
  id: string;
  url: string;
  projectId: string;
  createdAt: Date | string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  architect: string;
  type: string;
  location: string;
  duration: string;
  description: string;
  coverImage: string;
  featured: boolean;
  images: ProjectImage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Review {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  project: string | null;
  approved: boolean;
  createdAt: Date | string;
}
