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
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
    console.log(`Created empty ${fileName}`);
  }
}

function readData(fileName) {
  ensureDataFile(fileName);
  const filePath = path.join(DATA_DIR, fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing ${fileName}: ${error.message}`);
    return [];
  }
}

function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${fileName} successfully`);
    return true;
  } catch (error) {
    console.error(`Error writing to ${fileName}: ${error.message}`);
    return false;
  }
}

// Initialize data directory and files
function initializeDataFiles() {
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Created data directory at ${DATA_DIR}`);
  }
  
  // Initial data for all resources
  const initialData = {
    'packages.json': [
      {
        id: "pkg1",
        title: "Yara Escape Tours & Trek - Sikkim Explorer",
        description: "Experience the stunning beauty of Sikkim with this exclusive package from Yara Services, a local Sikkimese initiative registered with Tourism & Civil Aviation (SK/2025/A00470/DCG) specializing in authentic local experiences throughout the region.",
        price: "Contact for pricing",
        duration: "5 days / 4 nights",
        locations: ["Gangtok", "Tsomgo Lake", "Baba Mandir", "Nathula Pass", "Buddha Park"],
        imageUrl: "https://i.ibb.co/RT57xZKJ/fardin-sk-0-XG9-U9-REcx-M-unsplash-1.jpg",
        featured: true,
        startDate: "2025-05-15",
        endDate: "2025-05-19",
        maxPersons: 15,
        registrationNumber: "SK/2025/A00470/DCG",
        about: "We are an initiative of local Sikkimese travel enthusiasts who deal with packages in Sikkim, Darjeeling, North East India, South India, Andaman, Goa, Kashmir, South East Asia, Middle East and Europe. We have our own property in Gangtok (Hotel Lumsey Inn) & Kaluk (Pine Village Retreat) and are tied up with multiple Hotels and Travel Agencies in the region. We believe in bringing the best of local experience, both standard and off-beat and bring in the local touch and bond for times to come.",
        includes: [
          "Non-sharing vehicle",
          "Deluxe accommodation",
          "Breakfast & Dinner",
          "All permits, toll taxes, and parking charges",
          "Transfers and sightseeing as per itinerary",
          "Driver's Accommodation"
        ],
        excludes: [
          "Airfare/Trainfare",
          "Lunch",
          "Ropeway Charges additional",
          "Travel Insurance",
          "Entrance Fees and Guide charges",
          "Personal expenses (laundry, telephone calls, tips, mineral water, etc.)",
          "River rafting, rock climbing, paragliding",
          "Anything not mentioned in inclusions"
        ],
        termsAndConditions: [
          "Rates are for Indian citizens only",
          "Payment: 50% in advance and remaining 50% before check-in at the hotel",
          "Cancellation: 25% refund before 15 days of travel. No refund within 15 days of travel",
          "All rates quoted are in Indian currency",
          "All vehicles shall be on point-to-point basis (Not on Disposal basis)",
          "AC shall not be used in Hilly Areas",
          "Booking will be confirmed only after receiving an advance amount",
          "In case of landslide or any other reason we will provide alternate sight-seeing",
          "Prices may vary from season to season and hotel to hotel"
        ],
        accommodation: [
          { location: "Gangtok", hotel: "Lumsey Inn", nights: 4, category: "Deluxe", rooms: 8 }
        ],
        itinerary: [
          { 
            day: "Day", 
            title: "Arrival at Gangtok", 
            description: "Pickup from NJP Railway Station. We will move towards Gangtok, the capital of Sikkim, which reflects a unique ambience deriving from its blend of tradition and modernity. Alongside the presence of stupas and monasteries, Gangtok also bustles like any thriving town. Overnight stay at Gangtok." 
          },
          { 
            day: "Day", 
            title: "Tsomgo Lake and Baba Mandir", 
            description: "After breakfast, enjoy a full day excursion to Tsomgo Lake, filled with water from melting snow on nearby mountains. Later visit Baba Mandir, a shrine dedicated to soldier Harbhajan Singh of the Indian Army. Visit Nathu-La pass connecting Sikkim with Tibet. Evening exploration of Mall Road. Overnight stay at Gangtok." 
          },
          { 
            day: "Day", 
            title: "Gangtok Local Sightseeing", 
            description: "After breakfast, visit Gangtok's top attractions including Enchey Monastery, Ganesh Tok, Hanuman Tok, Tashi View Point, and Ban Jhakri Falls. Afternoon at leisure to explore local markets and cuisine. Overnight stay at Gangtok." 
          },
          { 
            day: "Day", 
            title: "Buddha Park and Namchi", 
            description: "Full day excursion to Buddha Park in Ravangla featuring a 130-foot Buddha statue, and Namchi to see the magnificent Chardham. Return to Gangtok in the evening for overnight stay." 
          },
          { 
            day: "Day", 
            title: "Return Journey", 
            description: "After breakfast, check out from the hotel and transfer to NJP Railway Station for your onward journey. End of our services with fond memories of Sikkim." 
          }
        ]
      },
      {
        id: "pkg2",
        title: "Yara Escape Tours & Trek - North Sikkim & Gangtok Explorer",
        description: "Experience the magnificent landscapes of North Sikkim including Gurudongmar Lake and Yumthang Valley in this 6-day adventure from Yara Services, a local Sikkimese initiative registered with Tourism & Civil Aviation (SK/2025/A00470/DCG).",
        price: "Contact for pricing",
        duration: "6 days / 5 nights",
        locations: ["Gangtok", "Lachen", "Lachung", "Gurudongmar Lake", "Yumthang Valley", "Tsomgo Lake", "Nathula Pass"],
        imageUrl: "https://i.ibb.co/8LwxX6JQ/yash-bhardwaj-Ygky-F9w-PU70-unsplash-1.jpg",
        featured: true,
        startDate: "2025-04-27",
        endDate: "2025-05-02",
        maxPersons: 17,
        registrationNumber: "SK/2025/A00470/DCG",
        vehicleType: "2 BOLEROS",
        about: "We are an initiative of local Sikkimese travel enthusiasts who deal with packages in Sikkim, Darjeeling, North East India, South India, Andaman, Goa, Kashmir, South East Asia, Middle East and Europe. We have our own property in Gangtok (Hotel Lumsey Inn) & Kaluk (Pine Village Retreat) and are tied up with multiple Hotels and Travel Agencies in the region. We believe in bringing the best of local experience, both standard and off-beat and bring in the local touch and bond for times to come.",
        includes: [
          "Non-sharing vehicle",
          "Deluxe accommodation",
          "All Meals in North Sikkim",
          "Breakfast & Dinner in Gangtok", 
          "All permits, toll taxes, and parking charges",
          "Premium Properties",
          "Driver's Accommodation",
          "Valid for Indian Nationals"
        ],
        excludes: [
          "Airfare/Trainfare",
          "Lunch in Gangtok",
          "Ropeway Charges",
          "Travel Insurance",
          "Entrance Fees and Guide charges",
          "Personal expenses (laundry, telephone calls, tips, mineral water, etc.)",
          "River rafting, rock climbing, paragliding",
          "Anything not mentioned in inclusions"
        ],
        termsAndConditions: [
          "Rates are for Indian citizens only",
          "Payment: 50% in advance and remaining 50% before check-in at the hotel",
          "Cancellation: 25% refund before 15 days of travel. No refund within 15 days of travel",
          "All rates quoted are in Indian currency",
          "All vehicles shall be on point-to-point basis (Not on Disposal basis)",
          "AC shall not be used in Hilly Areas",
          "Booking will be confirmed only after receiving an advance amount",
          "In case of landslide or any other reason we will provide alternate sight-seeing",
          "Prices may vary from season to season and hotel to hotel",
          "Any cost arising due to natural calamities to be borne by the client"
        ],
        accommodation: [
          { location: "Gangtok", hotel: "Arcadian Hotel or similar", nights: 3, category: "Deluxe", rooms: 8 },
          { location: "Lachen", hotel: "Royal Avalanche Retreat or similar", nights: 1, category: "Deluxe", rooms: 8 },
          { location: "Lachung", hotel: "Delight The Fortuna Deluxe or similar", nights: 1, category: "Deluxe", rooms: 8 }
        ],
        itinerary: [
          { 
            day: "Day", 
            title: "Arrival at Gangtok", 
            description: "Pick up from NJP Railway Station. We will move towards the capital of the state of Sikkim, Gangtok, which is an attractive tourist destination, reflecting a unique ambience which derives from its happy blend of tradition and modernity. Alongside the deeply felt presence of stupas and monasteries, Gangtok also bustles like any other thriving town. Overnight stay at Gangtok, One Can Explore Mall Road In the evening."
          },
          { 
            day: "Day",
            title: "Gangtok to Lachen", 
            description: "After breakfast you shall start your journey to Lachen. On the way you can visit Bakthang waterfalls, Tashi View point, Naga Falls and the Seven Sister Falls too. Take a stop at Chungthang Water Dam view point. Check into your hotel/home stay in Lachen. Evening will be at leisure. Have an early night as you will be visiting Gurudongmar Lake early in the morning."
          },
          { 
            day: "Day 3", 
            title: "Lachen to Gurudongmar Lake & Lachung", 
            description: "Early morning get ready to visit Gurudongmar Lake, at an altitude of more than 17000 ft above sea level. It is a sacred lake, a part of which never freezes even when temperatures dip to minus. You have to visit to know about the legend. Drive back to Lachen for lunch and continue towards Lachung. Check into hotel at Lachung. Enjoy a hearty meal and recount your adventure at Gurudongmar Lake."
          },
          { 
            day: "Day 4", 
            title: "Yumthang Valley & Return to Gangtok", 
            description: "After an early morning breakfast, you will be visiting the Yumthang valley which remains covered with snow in winters. Visit hot water springs en-route. You have a choice to drive further to Zero Point, a highly recommended destination which will need to be arranged locally. Normally April is considered to be the bloom month, then you must surely visit here for an excellent view of the valley covered with a carpet of rhododendron flowers. A must snap for your Honeymoon in Sikkim album. Drive back to Lachung for lunch and proceed towards Gangtok. Overnight stay at Gangtok."
          },
          { 
            day: "Day 5", 
            title: "Tsomgo Lake, Baba Mandir & Nathula", 
            description: "After breakfast, we will have a Full day Excursion of Tsomgo lake. The water in this lake has been accumulated from the melting snow on the mountains located nearby. Later visit to Baba Mandir, which is a distinguished sight-seeing place of Sikkim. This 'mandir' or shrine is dedicated to 'Baba' Harbhajan Singh, who was a soldier of the Indian Army. Then we can go to Nathu-La pass. It is one of the passes connecting Sikkim with Tibet Autonomous Region. Explore Mall Road in the Evening. Overnight stay at Gangtok."
          },
          { 
            day: "Day 6", 
            title: "Return Journey", 
            description: "After Breakfast, we will proceed towards your return journey; will drop you at NJP/BAGDOGRA. Here your trip will end with a happy note."
          }
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
        imageUrl: "https://i.ibb.co/BXWtsSp/Toyota-Innova-Crysta-2020.webp",
        description: "Spacious and comfortable SUV perfect for family trips across Sikkim's varied terrain."
      },
      {
        id: "car2",
        model: "Mahindra Scorpio",
        category: "SUV",
        seats: 7,
        transmission: "manual",
        ac: true,
        dailyRate: 3000,
        imageUrl: "https://i.ibb.co/WWJ33f6c/scorpio-exterior-right-front-three-quarter-47.webp",
        description: "Powerful SUV with excellent ground clearance for handling Sikkim's mountain roads."
      },
      {
        id: "car3",
        model: "Maruti Suzuki Dzire",
        category: "Sedan",
        seats: 5,
        transmission: "automatic",
        ac: true,
        dailyRate: 2000,
        imageUrl: "https://i.ibb.co/5hqtMYKP/Maruti-Suzuki-New-Dzire-111120241412.jpg",
        description: "Fuel-efficient sedan for comfortable rides on well-paved roads around urban areas."
      },
      {
        id: "car4",
        model: "Toyota Glanza",
        category: "Hatchback",
        seats: 5,
        transmission: "automatic",
        ac: true,
        dailyRate: 1800,
        imageUrl: "https://www.galaxytoyota.in/public/storage/1030/car-blue-(2).png",
        description: "Compact and stylish hatchback perfect for city tours and short trips."
      },
      {
        id: "car5",
        model: "Mahindra Bolero",
        category: "SUV",
        seats: 7,
        transmission: "manual",
        ac: true,
        dailyRate: 2500,
        imageUrl: "https://i.ibb.co/795ptsx/front-left-side-47.jpg",
        description: "Rugged and reliable workhorse with excellent off-road capabilities for remote areas."
      },
      {
        id: "car6",
        model: "Mahindra Bolero Neo",
        category: "SUV",
        seats: 7,
        transmission: "manual",
        ac: true,
        dailyRate: 2700,
        imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero-Neo/10766/1690267562292/rear-left-view-121.jpg",
        description: "Modern take on the classic Bolero with improved comfort and features for long journeys."
      }
    ],
    'bikes.json': [
      {
        id: "bike1",
        model: "Royal Enfield Himalayan 450",
        category: "Adventure",
        engineCapacity: "450cc",
        dailyRate: "Contact for price",
        gearType: "manual",
        imageUrl: "https://i.ibb.co/S4FCQScF/krcee13g-royal-enfield-himalayan-450-650-625x300-24-November-23.webp",
        description: "The upgraded Himalayan with more power and better off-road capabilities, perfect for Sikkim's mountain trails."
      },
      {
        id: "bike2",
        model: "Hero XPulse 200",
        category: "Dual Sport",
        engineCapacity: "200cc",
        dailyRate: "Contact for price",
        gearType: "manual",
        imageUrl: "https://i.ibb.co/pBgDPPpV/hero-xpulse-200-modified-2021-price-3.jpg",
        description: "Lightweight adventure bike ideal for beginners and those wanting to explore tight mountain roads."
      },
      {
        id: "bike3",
        model: "Honda Activa",
        category: "Scooter",
        engineCapacity: "110cc",
        dailyRate: "Contact for price",
        gearType: "automatic",
        imageUrl: "https://i.ibb.co/k26csJsw/download.jpg",
        description: "Convenient automatic scooter for easy city rides and short trips around Gangtok."
      },
      {
        id: "bike4",
        model: "Royal Enfield 350",
        category: "Cruiser",
        engineCapacity: "350cc",
        dailyRate: "Contact for price",
        gearType: "manual",
        imageUrl: "https://i.ibb.co/n8wczcTJ/2023-Royal-Enfield-Bullet-350-1693620256587-1711424746913.webp",
        description: "Classic motorcycle with timeless design, perfect for cruising around Sikkim's scenic roads."
      },
      {
        id: "bike5",
        model: "Himalayan 411",
        category: "Adventure",
        engineCapacity: "411cc",
        dailyRate: "Contact for price",
        gearType: "manual",
        imageUrl: "https://i.ibb.co/rP69FNg/royalenfieldhimalayan411-3.jpg",
        description: "Versatile adventure motorcycle built for exploring Sikkim's challenging terrain and mountain passes."
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
  
  // Create files if they don't exist and initialize with data
  Object.entries(initialData).forEach(([fileName, data]) => {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Created ${fileName} with sample data`);
    } else {
      console.log(`${fileName} already exists, keeping existing data`);
    }
  });
  
  console.log('Data files initialized successfully');
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

// Add data verification endpoint
app.get('/api/data-status', (req, res) => {
  try {
    const status = {};
    resources.forEach(resource => {
      const data = readData(`${resource}.json`);
      status[resource] = {
        count: data.length,
        isEmpty: data.length === 0
      };
    });
    
    res.json({ 
      status,
      dataDirectory: DATA_DIR,
      timestamp: new Date().toISOString()
    });
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
      const success = writeData(fileName, data);
      
      if (success) {
        res.status(201).json(newItem);
      } else {
        res.status(500).json({ error: 'Failed to save data' });
      }
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
      const success = writeData(fileName, data);
      
      if (success) {
        res.json(updatedItem);
      } else {
        res.status(500).json({ error: 'Failed to save changes' });
      }
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
      
      const success = writeData(fileName, filteredData);
      
      if (success) {
        res.json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to delete item' });
      }
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

// Add a root route handler for better navigation
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Yara Escape Journeys API',
    endpoints: {
      health: '/api/health',
      packages: '/api/packages',
      cars: '/api/cars',
      bikes: '/api/bikes',
      bookings: '/api/bookings',
      auth: '/api/auth/login'
    },
    version: '1.0.0'
  });
});

// Initialize data files on startup
initializeDataFiles();

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
