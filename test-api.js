// Enhanced script for comprehensive API testing

const API_URL = 'https://yara-service-backend-418054790950.us-central1.run.app';

async function testEndpoint(endpoint, method = 'GET', body = null) {
  console.log(`Testing ${method} ${API_URL}${endpoint}...`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('-----------------------------------');
    
    return { status: response.status, data };
  } catch (error) {
    console.error('Error:', error.message);
    console.log('-----------------------------------');
    return { error: error.message };
  }
}

async function runTests() {
  console.log('🧪 TESTING API ENDPOINTS 🧪');
  console.log('===================================');
  
  // Test health endpoint
  await testEndpoint('/api/health');
  
  // PACKAGES TESTING
  console.log('\n📦 PACKAGES TESTING 📦');
  // Get all packages
  await testEndpoint('/api/packages');
  
  // Get specific package by ID
  const packagesResult = await testEndpoint('/api/packages');
  if (packagesResult.data && packagesResult.data.length > 0) {
    const packageId = packagesResult.data[0].id;
    await testEndpoint(`/api/packages/${packageId}`);
  }
  
  // Create a new package
  const newPackage = {
    title: "Test Package",
    description: "This is a test package created via API",
    price: 9999,
    duration: "2 days",
    locations: ["Test Location"],
    imageUrl: "https://example.com/test.jpg",
    featured: false,
    includes: ["Test Feature"],
    itinerary: [
      { day: "Day 1", title: "Test Day", description: "Test description" }
    ]
  };
  const createdPackage = await testEndpoint('/api/packages', 'POST', newPackage);
  
  // Update the package if it was created
  if (createdPackage.data && createdPackage.data.id) {
    const updateData = {
      title: "Updated Test Package",
      price: 10999
    };
    await testEndpoint(`/api/packages/${createdPackage.data.id}`, 'PUT', updateData);
    
    // Delete the test package
    await testEndpoint(`/api/packages/${createdPackage.data.id}`, 'DELETE');
  }
  
  // CAR TESTING
  console.log('\n🚗 CARS TESTING 🚗');
  await testEndpoint('/api/cars');
  
  // BIKE TESTING
  console.log('\n🏍️ BIKES TESTING 🏍️');
  await testEndpoint('/api/bikes');
  
  // USER AUTH TESTING
  console.log('\n👤 USER AUTHENTICATION TESTING 👤');
  // Test successful login
  const loginResult = await testEndpoint('/api/auth/login', 'POST', { 
    email: 'admin@yaraescapejourneys.com', 
    password: 'admin123' 
  });
  
  // Test failed login
  await testEndpoint('/api/auth/login', 'POST', { 
    email: 'wrong@example.com', 
    password: 'wrongpassword' 
  });
  
  // BOOKINGS TESTING
  console.log('\n📅 BOOKINGS TESTING 📅');
  await testEndpoint('/api/bookings');
  
  // Test creating a booking
  if (loginResult.data && loginResult.data.token) {
    const newBooking = {
      userId: "testuser",
      packageId: packagesResult.data && packagesResult.data.length > 0 ? packagesResult.data[0].id : "pkg1",
      startDate: "2025-05-01",
      endDate: "2025-05-03",
      status: "pending",
      totalAmount: 15000,
      guests: 2,
      contactInfo: {
        name: "Test User",
        email: "test@example.com",
        phone: "9876543210"
      }
    };
    
    await testEndpoint('/api/bookings', 'POST', newBooking);
  }
  
  // Error handling test - try to get a non-existent resource
  console.log('\n❌ ERROR HANDLING TEST ❌');
  await testEndpoint('/api/packages/nonexistentid');
  
  console.log('\n✅ All tests completed');
}

// Run the tests
runTests();
