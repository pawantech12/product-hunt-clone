// server/api/products.ts
import { defineEventHandler, readMultipartFormData, MultiPartData } from "h3";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  website?: string;
  category: string;
  slug: string;
  image: string;
  upvotes: number;
  createdAt: Date;
  // 🔽 Add the following fields:
  hasUpvoted?: boolean; // Track if current user has upvoted
  user: { name: string }; // Product submitter
  comments?: {
    id: string;
    text: string;
    user: { name: string };
    createdAt: string;
  }[];
}

// Initial dummy data
export const products: Product[] = [
  {
    id: "1",
    name: "AI Assistant",
    tagline: "Your personal AI helper",
    description: "An AI tool that helps you with daily tasks.",
    website: "https://aiassistant.example.com",
    category: "AI",
    slug: "ai-assistant",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 120,
    createdAt: new Date("2025-05-01"),
    hasUpvoted: true,
    user: { name: "Alice" },
    comments: [
      {
        id: "c1",
        text: "This tool changed how I manage my day!",
        user: { name: "Bob" },
        createdAt: "2025-05-02T10:00:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "DesignPro",
    tagline: "Design tool for professionals",
    description: "Create stunning designs with ease.",
    website: "https://designpro.example.com",
    category: "Design",
    slug: "designpro",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 90,
    createdAt: new Date("2025-05-05"),
    hasUpvoted: false,
    user: { name: "Charlie" },
    comments: [
      {
        id: "c2",
        text: "Smooth and intuitive UI!",
        user: { name: "Daisy" },
        createdAt: "2025-05-06T09:00:00Z",
      },
    ],
  },
  {
    id: "3",
    name: "TaskMaster",
    tagline: "Productivity made simple",
    description: "Organize your tasks and boost productivity.",
    website: "https://taskmaster.example.com",
    category: "Productivity",
    slug: "taskmaster",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 75,
    createdAt: new Date("2025-04-15"),
    hasUpvoted: false,
    user: { name: "Eve" },
    comments: [],
  },
  {
    id: "4",
    name: "CodeGenie",
    tagline: "Smart coding assistant",
    description: "AI-powered code suggestions and debugging.",
    website: "https://codegenie.example.com",
    category: "Dev Tools",
    slug: "codegenie",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 110,
    createdAt: new Date("2025-03-28"),
    hasUpvoted: true,
    user: { name: "Frank" },
    comments: [
      {
        id: "c3",
        text: "Saved me hours on debugging!",
        user: { name: "Grace" },
        createdAt: "2025-03-30T12:00:00Z",
      },
    ],
  },
  {
    id: "5",
    name: "GameHub",
    tagline: "Discover new games",
    description: "Curated list of trending indie games.",
    website: "https://gamehub.example.com",
    category: "Games",
    slug: "gamehub",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 150,
    createdAt: new Date("2025-02-20"),
    hasUpvoted: true,
    user: { name: "Hannah" },
    comments: [],
  },
  {
    id: "6",
    name: "Artify",
    tagline: "AI-generated art",
    description: "Create art using neural networks.",
    website: "https://artify.example.com",
    category: "AI",
    slug: "artify",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 95,
    createdAt: new Date("2025-05-10"),
    hasUpvoted: false,
    user: { name: "Ivan" },
    comments: [],
  },
  {
    id: "7",
    name: "SketchFlow",
    tagline: "Design with flow",
    description: "Wireframe and prototype with ease.",
    website: "https://sketchflow.example.com",
    category: "Design",
    slug: "sketchflow",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 70,
    createdAt: new Date("2025-04-20"),
    hasUpvoted: true,
    user: { name: "Jack" },
    comments: [],
  },
  {
    id: "8",
    name: "FocusZen",
    tagline: "Stay focused, stay productive",
    description: "Pomodoro timer with analytics.",
    website: "https://focuszen.example.com",
    category: "Productivity",
    slug: "focuszen",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 65,
    createdAt: new Date("2025-04-18"),
    hasUpvoted: false,
    user: { name: "Karen" },
    comments: [],
  },
  {
    id: "9",
    name: "DevTrack",
    tagline: "Developer task tracker",
    description: "Track your coding tasks and bugs.",
    website: "https://devtrack.example.com",
    category: "Dev Tools",
    slug: "devtrack",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 80,
    createdAt: new Date("2025-03-05"),
    hasUpvoted: false,
    user: { name: "Leo" },
    comments: [],
  },
  {
    id: "10",
    name: "PlayZone",
    tagline: "Casual games collection",
    description: "A portal to fun and free browser games.",
    website: "https://playzone.example.com",
    category: "Games",
    slug: "playzone",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 140,
    createdAt: new Date("2025-04-02"),
    hasUpvoted: true,
    user: { name: "Mona" },
    comments: [],
  },
  {
    id: "11",
    name: "NeuralNote",
    tagline: "AI-powered note app",
    description: "Organize notes and get smart insights.",
    website: "https://neuralnote.example.com",
    category: "AI",
    slug: "neuralnote",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 88,
    createdAt: new Date("2025-05-08"),
    hasUpvoted: true,
    user: { name: "Nate" },
    comments: [],
  },
  {
    id: "12",
    name: "Pixelo",
    tagline: "Design with precision",
    description: "Pixel-perfect design tools for creators.",
    website: "https://pixelo.example.com",
    category: "Design",
    slug: "pixelo",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 82,
    createdAt: new Date("2025-03-25"),
    hasUpvoted: false,
    user: { name: "Olivia" },
    comments: [],
  },
  {
    id: "13",
    name: "ZenPlanner",
    tagline: "Minimalist productivity planner",
    description: "Plan your day the calm way.",
    website: "https://zenplanner.example.com",
    category: "Productivity",
    slug: "zenplanner",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 68,
    createdAt: new Date("2025-03-10"),
    hasUpvoted: false,
    user: { name: "Peter" },
    comments: [],
  },
  {
    id: "14",
    name: "CodeSnaps",
    tagline: "Share code visually",
    description: "Turn code into beautiful images.",
    website: "https://codesnaps.example.com",
    category: "Dev Tools",
    slug: "codesnaps",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 77,
    createdAt: new Date("2025-04-12"),
    hasUpvoted: true,
    user: { name: "Quinn" },
    comments: [],
  },
  {
    id: "15",
    name: "PixelWar",
    tagline: "Retro arcade shooter",
    description: "Fast-paced pixel art shooting game.",
    website: "https://pixelwar.example.com",
    category: "Games",
    slug: "pixelwar",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 125,
    createdAt: new Date("2025-05-03"),
    hasUpvoted: true,
    user: { name: "Rachel" },
    comments: [],
  },
  {
    id: "16",
    name: "SmartBrain",
    tagline: "Train your brain",
    description: "AI-based brain training games.",
    website: "https://smartbrain.example.com",
    category: "AI",
    slug: "smartbrain",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 100,
    createdAt: new Date("2025-04-30"),
    hasUpvoted: false,
    user: { name: "Sam" },
    comments: [],
  },
  {
    id: "17",
    name: "UIWizard",
    tagline: "UI kits for designers",
    description: "Ready-to-use UI components and kits.",
    website: "https://uiwizard.example.com",
    category: "Design",
    slug: "uiwizard",
    image:
      "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg",
    upvotes: 93,
    createdAt: new Date("2025-05-01"),
    hasUpvoted: true,
    user: { name: "Tina" },
    comments: [],
  },
];

function getValue(fields: MultiPartData[], name: string): string {
  return fields.find((f) => f.name === name)?.data?.toString() || "";
}

function slugify(text: string | undefined | null) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === "GET") {
    return products;
  }

  if (event.method === "POST") {
    const body = await readMultipartFormData(event);

    if (!body) {
      return {
        statusCode: 400,
        statusMessage: "No data submitted",
      };
    }

    const name = getValue(body, "name");
    const tagline = getValue(body, "tagline");
    const description = getValue(body, "description");
    const website = getValue(body, "website");
    const category = getValue(body, "category");

    // Find the image file (assuming input field named 'image')
    const imageFile = body.find(
      (item) => item.name === "image" && item.data instanceof Uint8Array
    );

    // Convert image binary to base64 data URL string if found
    let imageDataUrl = "";
    if (imageFile && imageFile.data) {
      const mimeType = imageFile.type || "image/jpeg"; // fallback mime type
      const base64 = Buffer.from(imageFile.data).toString("base64");
      imageDataUrl = `data:${mimeType};base64,${base64}`;
    }
    const newProduct = {
      id: String(products.length + 1),
      name,
      tagline,
      description,
      website,
      category,
      slug: slugify(name),
      image: imageDataUrl,
      upvotes: 0,
      createdAt: new Date(),
      hasUpvoted: false,
      user: { name: "Anonymous" }, // You can use actual user info from the token
    };

    products.push(newProduct);

    return {
      statusCode: 201,
      ...newProduct,
    };
  }

  // fallback
  return {
    statusCode: 405,
    statusMessage: "Method Not Allowed",
  };
});
