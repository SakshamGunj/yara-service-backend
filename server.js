import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Data directory
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper functions for data persistence
function ensureDataFile(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function readData(fileName) {
  ensureDataFile(fileName);
  const filePath = path.join(DATA_DIR, fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Initialize with demo data
function initializeDemoData() {
  // Import demo data
  const demoData = {
    'packages.json': [
      {
        id: "pkg1",
        title: "Gangtok Explorer",
        description: "Discover the beauty of Gangtok with our 3-day comprehensive tour package.",
        price: 12999,
        duration: "3 days",
        locations: ["Gangtok", "Nathula Pass", "Tsomgo Lake"],
        imageUrl: "https://images.unsplash.com/photo-1566396223585-c8747795ca6d?q=80&w=1365&auto=format&fit=crop",
        featured: true,
        includes: ["Accommodation", "Transportation", "Sightseeing", "Guide"],
        itinerary: [
          { day: "Day 1", title: "Arrival & Local Sightseeing", description: "Arrive in Gangtok, check-in to hotel, visit local attractions like MG Road and Flower Show." },
          { day: "Day 2", title: "Tsomgo Lake & Baba Mandir", description: "Full day excursion to the stunning Tsomgo Lake and sacred Baba Mandir." },
          { day: "Day 3", title: "Departure", description: "After breakfast, visit local markets for souvenir shopping before departure." }
        ]
      },
      {
        id: "pkg2",
        title: "North Sikkim Adventure",
        description: "Experience the majestic landscapes of North Sikkim in this thrilling 5-day adventure.",
        price: 24999,
        duration: "5 days",
        locations: ["Gangtok", "Lachen", "Lachung", "Yumthang Valley"],
        imageUrl: "https://images.unsplash.com/photo-1602602224355-6438f63e1f40?q=80&w=1372&auto=format&fit=crop",
        featured: true,
        includes: ["Accommodation", "Transportation", "Meals", "Permits", "Guide"],
        itinerary: [
          { day: "Day 1", title: "Gangtok Arrival", description: "Arrive in Gangtok and prepare for the adventure ahead." },
          { day: "Day 2", title: "Gangtok to Lachen", description: "Travel to Lachen, visiting Chungthang and Seven Sisters Waterfall en route." },
          { day: "Day 3", title: "Gurudongmar Lake Excursion", description: "Early morning drive to the breathtaking Gurudongmar Lake." },
          { day: "Day 4", title: "Lachen to Lachung", description: "Transfer to Lachung, known for its beautiful valleys and waterfalls." },
          { day: "Day 5", title: "Yumthang Valley & Return", description: "Visit the stunning Yumthang Valley before returning to Gangtok." }
        ]
      }
    ],
    'cars.json': [
      {
        id: "car1",
        model: "Toyota Innova Crysta",
        category: "SUV",
        seats: 7,
        transmission: "automatic",
        ac: true,
        dailyRate: 3500,
        imageUrl: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop",
        description: "Spacious and comfortable SUV perfect for family trips across Sikkim's varied terrain."
      },
      {
        id: "car2",
        model: "Mahindra Thar",
        category: "Jeep",
        seats: 4,
        transmission: "manual",
        ac: true,
        dailyRate: 2800,
        imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
        description: "Rugged and reliable 4x4 ideal for adventure enthusiasts and off-road experiences."
      }
    ],
    'bikes.json': [
      {
        id: "bike1",
        model: "Royal Enfield Himalayan",
        category: "Adventure",
        engineCapacity: "411cc",
        dailyRate: 1200,
        gearType: "manual",
        imageUrl: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=1200&auto=format&fit=crop",
        description: "Purpose-built for the Himalayas, this adventure bike handles rough terrain with ease."
      },
      {
        id: "bike2",
        model: "Royal Enfield Classic 350",
        category: "Cruiser",
        engineCapacity: "350cc",
        dailyRate: 900,
        gearType: "manual",
        imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1200&auto=format&fit=crop",
        description: "Iconic retro styling with reliable performance for comfortable touring around Sikkim."
      }
    ],
    'bookings.json': [],
    'inquiries.json': [],
    'users.json': [
      {
        id: "admin",
        name: "Admin User",
        email: "admin@yaraescapejourneys.com",
        password: "admin123",
        role: "admin"
      }
    ]
  };

  // Initialize each file with demo data
  Object.entries(demoData).forEach(([fileName, data]) => {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      writeData(fileName, data);
      console.log(`Initialized ${fileName} with demo data`);
    }
  });
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Setup database with demo data
app.get('/api/setup-db', (req, res) => {
  try {
    initializeDemoData();
    res.json({ success: true, message: 'Database initialized with demo data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generic CRUD operations for any resource
const resources = ['packages', 'cars', 'bikes', 'bookings', 'inquiries', 'users'];

resources.forEach(resource => {
  const fileName = `${resource}.json`;
  
  // Get all items
  app.get(`/api/${resource}`, (req, res) => {
    try {
      const data = readData(fileName);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific item by ID
  app.get(`/api/${resource}/:id`, (req, res) => {
    try {
      const data = readData(fileName);
      const item = data.find(i => i.id === req.params.id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new item
  app.post(`/api/${resource}`, (req, res) => {
    try {
      const data = readData(fileName);
      const newItem = {
        id: req.body.id || `${resource.slice(0, 1)}_${uuidv4().substring(0, 8)}`,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      
      data.push(newItem);
      writeData(fileName, data);
      
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update an item
  app.put(`/api/${resource}/:id`, (req, res) => {
    try {
      const data = readData(fileName);
      const index = data.findIndex(i => i.id === req.params.id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      const updatedItem = {
        ...data[index],
        ...req.body,
        id: req.params.id, // Ensure ID is preserved
        updatedAt: new Date().toISOString()
      };
      
      data[index] = updatedItem;
      writeData(fileName, data);
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete an item
  app.delete(`/api/${resource}/:id`, (req, res) => {
    try {
      const data = readData(fileName);
      const filteredData = data.filter(i => i.id !== req.params.id);
      
      if (filteredData.length === data.length) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      writeData(fileName, filteredData);
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData('users.json');
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // In a production app, you would use JWT tokens here
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize demo data on startup
initializeDemoData();

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
