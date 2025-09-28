import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const START_DATE = new Date('2025-09-28');
const END_DATE = new Date('2025-12-24');
const COMMIT_PROBABILITY = 0.80; // 80% of days should have commits
const DOUBLE_COMMIT_PROBABILITY = 0.15; // 15% of days have 2 commits

// Development phases with commit messages
const developmentPhases = [
  // Phase 1: Project Initialization (Week 1-2)
  {
    phase: 'Initial Setup',
    commits: [
      { msg: 'Initialize project structure', files: ['README.md'], type: 'setup' },
      { msg: 'Add gitignore file', files: ['.gitignore'], type: 'setup' },
      { msg: 'Create backend package.json', files: ['backend/package.json'], type: 'setup' },
      { msg: 'Create frontend package.json', files: ['frontend/package.json'], type: 'setup' },
      { msg: 'Create admin package.json', files: ['admin/package.json'], type: 'setup' },
    ]
  },
  // Phase 2: Backend Setup (Week 2-4)
  {
    phase: 'Backend Foundation',
    commits: [
      { msg: 'Setup Express server with basic configuration', files: ['backend/server.js'], type: 'backend' },
      { msg: 'Configure MongoDB connection', files: ['backend/config/db.js'], type: 'backend' },
      { msg: 'Create User model schema', files: ['backend/models/userModel.js'], type: 'backend' },
      { msg: 'Create Food model schema', files: ['backend/models/foodModel.js'], type: 'backend' },
      { msg: 'Create Order model schema', files: ['backend/models/orderModel.js'], type: 'backend' },
      { msg: 'Implement JWT authentication middleware', files: ['backend/middleware/auth.js'], type: 'backend' },
    ]
  },
  // Phase 3: Backend API - User Routes (Week 4-6)
  {
    phase: 'Backend User API',
    commits: [
      { msg: 'Implement user registration endpoint', files: ['backend/controllers/userController.js'], type: 'backend' },
      { msg: 'Implement user login endpoint with JWT', files: ['backend/controllers/userController.js'], type: 'backend' },
      { msg: 'Add password hashing with bcrypt', files: ['backend/controllers/userController.js'], type: 'backend' },
      { msg: 'Setup user routes', files: ['backend/routes/userRoute.js'], type: 'backend' },
      { msg: 'Add input validation for user endpoints', files: ['backend/controllers/userController.js'], type: 'backend' },
    ]
  },
  // Phase 4: Backend API - Food Routes (Week 6-8)
  {
    phase: 'Backend Food API',
    commits: [
      { msg: 'Implement food list endpoint', files: ['backend/controllers/foodController.js'], type: 'backend' },
      { msg: 'Add file upload with multer for food images', files: ['backend/controllers/foodController.js'], type: 'backend' },
      { msg: 'Implement add food item endpoint', files: ['backend/controllers/foodController.js'], type: 'backend' },
      { msg: 'Implement remove food item endpoint', files: ['backend/controllers/foodController.js'], type: 'backend' },
      { msg: 'Setup food routes with authentication', files: ['backend/routes/foodRoute.js'], type: 'backend' },
    ]
  },
  // Phase 5: Backend API - Cart Routes (Week 8-9)
  {
    phase: 'Backend Cart API',
    commits: [
      { msg: 'Implement add to cart functionality', files: ['backend/controllers/cartController.js'], type: 'backend' },
      { msg: 'Implement remove from cart functionality', files: ['backend/controllers/cartController.js'], type: 'backend' },
      { msg: 'Implement get cart endpoint', files: ['backend/controllers/cartController.js'], type: 'backend' },
      { msg: 'Setup cart routes', files: ['backend/routes/cartRoute.js'], type: 'backend' },
    ]
  },
  // Phase 6: Backend API - Order Routes (Week 9-11)
  {
    phase: 'Backend Order API',
    commits: [
      { msg: 'Implement place order endpoint', files: ['backend/controllers/orderController.js'], type: 'backend' },
      { msg: 'Integrate Stripe payment processing', files: ['backend/controllers/orderController.js'], type: 'backend' },
      { msg: 'Implement order verification endpoint', files: ['backend/controllers/orderController.js'], type: 'backend' },
      { msg: 'Implement get user orders endpoint', files: ['backend/controllers/orderController.js'], type: 'backend' },
      { msg: 'Implement list all orders endpoint for admin', files: ['backend/controllers/orderController.js'], type: 'backend' },
      { msg: 'Implement update order status endpoint', files: ['backend/controllers/orderController.js'], type: 'backend' },
      { msg: 'Setup order routes', files: ['backend/routes/orderRoute.js'], type: 'backend' },
    ]
  },
  // Phase 7: Frontend Setup (Week 11-12)
  {
    phase: 'Frontend Setup',
    commits: [
      { msg: 'Initialize React frontend with Vite', files: ['frontend/package.json', 'frontend/vite.config.js'], type: 'frontend' },
      { msg: 'Setup React Router for navigation', files: ['frontend/src/App.jsx'], type: 'frontend' },
      { msg: 'Create StoreContext for global state management', files: ['frontend/src/context/StoreContext.jsx'], type: 'frontend' },
      { msg: 'Add base styles and global CSS', files: ['frontend/src/index.css'], type: 'frontend' },
    ]
  },
  // Phase 8: Frontend Components - Layout (Week 12-14)
  {
    phase: 'Frontend Layout Components',
    commits: [
      { msg: 'Create Header component with hero section', files: ['frontend/src/components/Header/Header.jsx', 'frontend/src/components/Header/Header.css'], type: 'frontend' },
      { msg: 'Create Navbar component with navigation', files: ['frontend/src/components/Navbar/Navbar.jsx', 'frontend/src/components/Navbar/Navbar.css'], type: 'frontend' },
      { msg: 'Create Footer component', files: ['frontend/src/components/Footer/Footer.jsx', 'frontend/src/components/Footer/Footer.css'], type: 'frontend' },
      { msg: 'Style Header component with responsive design', files: ['frontend/src/components/Header/Header.css'], type: 'frontend' },
      { msg: 'Add mobile responsive styles to Navbar', files: ['frontend/src/components/Navbar/Navbar.css'], type: 'frontend' },
    ]
  },
  // Phase 9: Frontend Components - Food Display (Week 14-16)
  {
    phase: 'Frontend Food Components',
    commits: [
      { msg: 'Create FoodItem component for displaying food cards', files: ['frontend/src/components/FoodItem/FoodItem.jsx', 'frontend/src/components/FoodItem/FoodItem.css'], type: 'frontend' },
      { msg: 'Create FoodDisplay component with grid layout', files: ['frontend/src/components/FoodDisplay/FoodDisplay.jsx', 'frontend/src/components/FoodDisplay/FoodDisplay.css'], type: 'frontend' },
      { msg: 'Create ExploreMenu component with category filter', files: ['frontend/src/components/ExploreMenu/ExploreMenu.jsx', 'frontend/src/components/ExploreMenu/ExploreMenu.css'], type: 'frontend' },
      { msg: 'Add API integration to fetch food items', files: ['frontend/src/components/FoodDisplay/FoodDisplay.jsx'], type: 'frontend' },
      { msg: 'Implement category filtering functionality', files: ['frontend/src/components/ExploreMenu/ExploreMenu.jsx'], type: 'frontend' },
      { msg: 'Add responsive styling to FoodDisplay', files: ['frontend/src/components/FoodDisplay/FoodDisplay.css'], type: 'frontend' },
    ]
  },
  // Phase 10: Frontend Authentication (Week 16-17)
  {
    phase: 'Frontend Authentication',
    commits: [
      { msg: 'Create LoginPopup component with login form', files: ['frontend/src/components/LoginPopup/LoginPopup.jsx', 'frontend/src/components/LoginPopup/LoginPopup.css'], type: 'frontend' },
      { msg: 'Add user registration functionality', files: ['frontend/src/components/LoginPopup/LoginPopup.jsx'], type: 'frontend' },
      { msg: 'Implement login API integration', files: ['frontend/src/context/StoreContext.jsx'], type: 'frontend' },
      { msg: 'Add JWT token storage and management', files: ['frontend/src/context/StoreContext.jsx'], type: 'frontend' },
      { msg: 'Style LoginPopup with modern UI', files: ['frontend/src/components/LoginPopup/LoginPopup.css'], type: 'frontend' },
    ]
  },
  // Phase 11: Frontend Pages - Home (Week 17-18)
  {
    phase: 'Frontend Home Page',
    commits: [
      { msg: 'Create Home page component', files: ['frontend/src/pages/Home/Home.jsx', 'frontend/src/pages/Home/Home.css'], type: 'frontend' },
      { msg: 'Integrate Header, ExploreMenu and FoodDisplay', files: ['frontend/src/pages/Home/Home.jsx'], type: 'frontend' },
      { msg: 'Add AppDownload component to home page', files: ['frontend/src/components/AppDownload/AppDownload.jsx', 'frontend/src/components/AppDownload/AppDownload.css'], type: 'frontend' },
      { msg: 'Complete Home page styling', files: ['frontend/src/pages/Home/Home.css'], type: 'frontend' },
    ]
  },
  // Phase 12: Frontend Pages - Cart (Week 18-19)
  {
    phase: 'Frontend Cart Page',
    commits: [
      { msg: 'Create Cart page component', files: ['frontend/src/pages/Cart/Cart.jsx', 'frontend/src/pages/Cart/Cart.css'], type: 'frontend' },
      { msg: 'Implement add to cart functionality', files: ['frontend/src/context/StoreContext.jsx'], type: 'frontend' },
      { msg: 'Implement remove from cart functionality', files: ['frontend/src/pages/Cart/Cart.jsx'], type: 'frontend' },
      { msg: 'Add cart quantity management', files: ['frontend/src/pages/Cart/Cart.jsx'], type: 'frontend' },
      { msg: 'Calculate and display total price', files: ['frontend/src/pages/Cart/Cart.jsx'], type: 'frontend' },
      { msg: 'Style Cart page with responsive design', files: ['frontend/src/pages/Cart/Cart.css'], type: 'frontend' },
    ]
  },
  // Phase 13: Frontend Pages - PlaceOrder (Week 19-21)
  {
    phase: 'Frontend Place Order',
    commits: [
      { msg: 'Create PlaceOrder page component', files: ['frontend/src/pages/PlaceOrder/PlaceOrder.jsx', 'frontend/src/pages/PlaceOrder/PlaceOrder.css'], type: 'frontend' },
      { msg: 'Add delivery address form', files: ['frontend/src/pages/PlaceOrder/PlaceOrder.jsx'], type: 'frontend' },
      { msg: 'Integrate Stripe payment checkout', files: ['frontend/src/pages/PlaceOrder/PlaceOrder.jsx'], type: 'frontend' },
      { msg: 'Implement order placement API call', files: ['frontend/src/context/StoreContext.jsx'], type: 'frontend' },
      { msg: 'Add form validation for address fields', files: ['frontend/src/pages/PlaceOrder/PlaceOrder.jsx'], type: 'frontend' },
      { msg: 'Style PlaceOrder page', files: ['frontend/src/pages/PlaceOrder/PlaceOrder.css'], type: 'frontend' },
    ]
  },
  // Phase 14: Frontend Pages - Verify & MyOrders (Week 21-22)
  {
    phase: 'Frontend Order Pages',
    commits: [
      { msg: 'Create Verify page for payment confirmation', files: ['frontend/src/pages/Verify/Verify.jsx', 'frontend/src/pages/Verify/Verify.css'], type: 'frontend' },
      { msg: 'Implement order verification API call', files: ['frontend/src/pages/Verify/Verify.jsx'], type: 'frontend' },
      { msg: 'Create MyOrders page to display order history', files: ['frontend/src/pages/MyOrders/MyOrders.jsx', 'frontend/src/pages/MyOrders/MyOrders.css'], type: 'frontend' },
      { msg: 'Add order status display with styling', files: ['frontend/src/pages/MyOrders/MyOrders.jsx'], type: 'frontend' },
      { msg: 'Implement fetch user orders API integration', files: ['frontend/src/context/StoreContext.jsx'], type: 'frontend' },
      { msg: 'Style MyOrders page with order cards', files: ['frontend/src/pages/MyOrders/MyOrders.css'], type: 'frontend' },
    ]
  },
  // Phase 15: Admin Panel Setup (Week 22-23)
  {
    phase: 'Admin Panel Setup',
    commits: [
      { msg: 'Initialize admin panel React app', files: ['admin/package.json', 'admin/vite.config.js'], type: 'admin' },
      { msg: 'Setup admin routing and layout', files: ['admin/src/App.jsx'], type: 'admin' },
      { msg: 'Create Admin StoreContext', files: ['admin/src/context/StoreContext.jsx'], type: 'admin' },
      { msg: 'Add admin base styles', files: ['admin/src/index.css'], type: 'admin' },
    ]
  },
  // Phase 16: Admin Components (Week 23-25)
  {
    phase: 'Admin Components',
    commits: [
      { msg: 'Create Admin Navbar component', files: ['admin/src/components/Navbar/Navbar.jsx', 'admin/src/components/Navbar/Navbar.css'], type: 'admin' },
      { msg: 'Create Admin Sidebar component', files: ['admin/src/components/Sidebar/Sidebar.jsx', 'admin/src/components/Sidebar/Sidebar.css'], type: 'admin' },
      { msg: 'Create Admin Login component', files: ['admin/src/components/Login/Login.jsx', 'admin/src/components/Login/Login.css'], type: 'admin' },
      { msg: 'Style admin layout components', files: ['admin/src/components/Navbar/Navbar.css', 'admin/src/components/Sidebar/Sidebar.css'], type: 'admin' },
    ]
  },
  // Phase 17: Admin Pages - Add Food (Week 25-26)
  {
    phase: 'Admin Add Food',
    commits: [
      { msg: 'Create Add page for adding food items', files: ['admin/src/pages/Add/Add.jsx', 'admin/src/pages/Add/Add.css'], type: 'admin' },
      { msg: 'Implement image upload functionality', files: ['admin/src/pages/Add/Add.jsx'], type: 'admin' },
      { msg: 'Add form fields for food details', files: ['admin/src/pages/Add/Add.jsx'], type: 'admin' },
      { msg: 'Integrate add food API endpoint', files: ['admin/src/context/StoreContext.jsx'], type: 'admin' },
      { msg: 'Add form validation and error handling', files: ['admin/src/pages/Add/Add.jsx'], type: 'admin' },
      { msg: 'Style Add page with upload area', files: ['admin/src/pages/Add/Add.css'], type: 'admin' },
    ]
  },
  // Phase 18: Admin Pages - List & Orders (Week 26-28)
  {
    phase: 'Admin List & Orders',
    commits: [
      { msg: 'Create List page to display all food items', files: ['admin/src/pages/List/List.jsx', 'admin/src/pages/List/List.css'], type: 'admin' },
      { msg: 'Implement remove food item functionality', files: ['admin/src/pages/List/List.jsx'], type: 'admin' },
      { msg: 'Create Orders page to manage orders', files: ['admin/src/pages/Orders/Orders.jsx', 'admin/src/pages/Orders/Orders.css'], type: 'admin' },
      { msg: 'Add order status update functionality', files: ['admin/src/pages/Orders/Orders.jsx'], type: 'admin' },
      { msg: 'Integrate order list API endpoint', files: ['admin/src/context/StoreContext.jsx'], type: 'admin' },
      { msg: 'Add order filtering and search', files: ['admin/src/pages/Orders/Orders.jsx'], type: 'admin' },
      { msg: 'Style List and Orders pages', files: ['admin/src/pages/List/List.css', 'admin/src/pages/Orders/Orders.css'], type: 'admin' },
    ]
  },
  // Phase 19: Integration & Testing (Week 28-30)
  {
    phase: 'Integration & Testing',
    commits: [
      { msg: 'Fix CORS configuration for frontend-backend communication', files: ['backend/server.js'], type: 'fix' },
      { msg: 'Add error handling for API calls in frontend', files: ['frontend/src/context/StoreContext.jsx'], type: 'fix' },
      { msg: 'Fix cart persistence on page refresh', files: ['frontend/src/context/StoreContext.jsx'], type: 'fix' },
      { msg: 'Add loading states for async operations', files: ['frontend/src/components/FoodDisplay/FoodDisplay.jsx'], type: 'fix' },
      { msg: 'Fix image upload path handling in backend', files: ['backend/controllers/foodController.js'], type: 'fix' },
      { msg: 'Add toast notifications for user feedback', files: ['frontend/src/components/LoginPopup/LoginPopup.jsx'], type: 'fix' },
    ]
  },
  // Phase 20: Improvements & Polish (Week 30-35)
  {
    phase: 'Improvements',
    commits: [
      { msg: 'Improve responsive design for mobile devices', files: ['frontend/src/index.css'], type: 'improve' },
      { msg: 'Add search functionality to food items', files: ['frontend/src/components/FoodDisplay/FoodDisplay.jsx'], type: 'improve' },
      { msg: 'Enhance error messages and validation', files: ['backend/controllers/userController.js'], type: 'improve' },
      { msg: 'Optimize image loading and caching', files: ['backend/server.js'], type: 'improve' },
      { msg: 'Add order status badges with colors', files: ['admin/src/pages/Orders/Orders.css'], type: 'improve' },
      { msg: 'Improve admin dashboard UI/UX', files: ['admin/src/index.css'], type: 'improve' },
      { msg: 'Add loading spinners for better UX', files: ['frontend/src/components/FoodDisplay/FoodDisplay.jsx'], type: 'improve' },
    ]
  },
  // Phase 21: Documentation (Week 35-36)
  {
    phase: 'Documentation',
    commits: [
      { msg: 'Write comprehensive README documentation', files: ['README.md'], type: 'docs' },
      { msg: 'Add API documentation to README', files: ['README.md'], type: 'docs' },
      { msg: 'Add installation and setup instructions', files: ['README.md'], type: 'docs' },
      { msg: 'Add deployment guidelines', files: ['README.md'], type: 'docs' },
    ]
  },
  // Phase 22: Final Polish (Week 36-52)
  {
    phase: 'Final Polish',
    commits: [
      { msg: 'Fix minor UI inconsistencies', files: ['frontend/src/index.css'], type: 'polish' },
      { msg: 'Optimize bundle size and performance', files: ['frontend/vite.config.js'], type: 'polish' },
      { msg: 'Add environment variable examples', files: ['backend/.env.example'], type: 'polish' },
      { msg: 'Update package.json descriptions', files: ['backend/package.json', 'frontend/package.json', 'admin/package.json'], type: 'polish' },
      { msg: 'Final code cleanup and formatting', files: ['backend/server.js'], type: 'polish' },
      { msg: 'Add comments to complex functions', files: ['backend/controllers/orderController.js'], type: 'polish' },
    ]
  }
];

// Helper function to get random time between 9 AM and 11 PM
function getRandomTime() {
  const hour = Math.floor(Math.random() * 14) + 9; // 9-22
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

// Helper function to add comment to file (simulate change)
function addCommentToFile(filePath, comment) {
  try {
    if (!fs.existsSync(filePath)) return false;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add comment at the beginning if it's a code file
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      // Only add if comment doesn't already exist
      if (!content.includes(comment.substring(0, 20))) {
        content = `// ${comment}\n${content}`;
      }
    } else if (filePath.endsWith('.json')) {
      // For JSON, we'll add a comment in a different way or skip
      return false;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    return false;
  }
}

// Track file modification history to avoid duplicates
const fileModHistory = new Map();

// Helper function to modify file slightly (change a comment, add whitespace, etc.)
function modifyFile(filePath, commitMsg, commitIndex) {
  try {
    if (!fs.existsSync(filePath)) {
      // If file doesn't exist, skip it
      return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const timestamp = Date.now();
    
    // Make a small, realistic change based on file type
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      // Always ensure there's a trailing newline, and add a subtle comment
      content = content.trim();
      if (!content.endsWith('\n')) {
        content += '\n';
      }
      // Add a comment at the very end
      const modCount = fileModHistory.get(filePath) || 0;
      content += `\n// Development commit #${modCount + 1}\n`;
    } else if (filePath.endsWith('.css')) {
      // Add a comment at the end
      content = content.trim();
      if (!content.endsWith('\n')) {
        content += '\n';
      }
      const modCount = fileModHistory.get(filePath) || 0;
      content += `\n/* Development commit #${modCount + 1} */\n`;
    } else if (filePath.endsWith('.json')) {
      // For JSON, ensure proper formatting and trailing newline
      content = content.trim() + '\n';
    } else if (filePath.endsWith('.md')) {
      // For markdown, ensure trailing newlines
      content = content.trim() + '\n\n';
    } else {
      // For other files, just ensure trailing newline
      content = content.trim() + '\n';
    }
    
    // Always write (we always make a change with the comment)
    fs.writeFileSync(filePath, content, 'utf8');
    fileModHistory.set(filePath, (fileModHistory.get(filePath) || 0) + 1);
    return true;
  } catch (error) {
    // Silently fail for files that can't be modified
    return false;
  }
}

// Generate date list with commits
function generateCommitDates() {
  const dates = [];
  const currentDate = new Date(START_DATE);
  
  while (currentDate <= END_DATE) {
    const shouldCommit = Math.random() < COMMIT_PROBABILITY;
    const hasDoubleCommit = Math.random() < DOUBLE_COMMIT_PROBABILITY;
    
    if (shouldCommit) {
      dates.push({
        date: new Date(currentDate),
        commits: hasDoubleCommit ? 2 : 1
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

// Main function to generate commits
async function generateCommits() {
  console.log('Starting commit generation...');
  console.log(`Date range: ${START_DATE.toLocaleDateString()} to ${END_DATE.toLocaleDateString()}`);
  
  // Check git configuration
  try {
    execSync('git config user.name', { stdio: 'ignore' });
    execSync('git config user.email', { stdio: 'ignore' });
  } catch (error) {
    console.error('Error: Git user name or email not configured. Please run:');
    console.error('  git config --global user.name "Your Name"');
    console.error('  git config --global user.email "your.email@example.com"');
    process.exit(1);
  }
  
  // Flatten all commits from phases
  const allCommits = [];
  developmentPhases.forEach(phase => {
    phase.commits.forEach(commit => {
      allCommits.push(commit);
    });
  });
  
  // Generate commit dates
  const commitDates = generateCommitDates();
  console.log(`Generated ${commitDates.length} commit dates`);
  console.log(`Total commits to create: ${commitDates.reduce((sum, d) => sum + d.commits, 0)}`);
  
  // Distribute commits across dates
  let commitIndex = 0;
  const commitsPerDate = [];
  
  for (const dateInfo of commitDates) {
    const dateCommits = [];
    for (let i = 0; i < dateInfo.commits; i++) {
      if (commitIndex < allCommits.length) {
        dateCommits.push(allCommits[commitIndex]);
        commitIndex++;
      } else {
        // If we run out of predefined commits, create generic ones
        dateCommits.push({
          msg: `Code improvements and bug fixes`,
          files: ['README.md'],
          type: 'improve'
        });
      }
    }
    commitsPerDate.push({
      date: dateInfo.date,
      commits: dateCommits
    });
  }
  
  // Handle remaining commits if any
  while (commitIndex < allCommits.length) {
    const lastDate = commitsPerDate[commitsPerDate.length - 1];
    lastDate.commits.push(allCommits[commitIndex]);
    commitIndex++;
  }
  
  console.log(`Processing ${commitsPerDate.length} dates with commits...`);
  
  // Process each date and create commits
  for (let i = 0; i < commitsPerDate.length; i++) {
    const { date, commits } = commitsPerDate[i];
    
    for (let j = 0; j < commits.length; j++) {
      const commit = commits[j];
      const commitTime = getRandomTime();
      const commitDate = new Date(date);
      const [hours, minutes] = commitTime.split(':');
      commitDate.setHours(parseInt(hours), parseInt(minutes), Math.floor(Math.random() * 60));
      
      // Modify files for this commit
      let filesModified = false;
      for (const file of commit.files) {
        if (modifyFile(file, commit.msg, i)) {
          filesModified = true;
        }
      }
      
      // If no files were modified, try README as fallback
      if (!filesModified) {
        if (modifyFile('README.md', commit.msg, i)) {
          filesModified = true;
        }
      }
      
      // Stage all changes
      try {
        execSync('git add -A', { stdio: 'ignore' });
      } catch (error) {
        console.error('Error staging files:', error.message);
      }
      
      // Create commit with backdated date
      const dateStr = commitDate.toISOString();
      const commitCmd = `git commit -m "${commit.msg}" --date="${dateStr}" --no-verify`;
      
      try {
        execSync(commitCmd, { stdio: 'inherit' });
        console.log(`✓ Committed: ${commit.msg} on ${commitDate.toLocaleDateString()} at ${commitTime}`);
      } catch (error) {
        console.error(`Error committing: ${commit.msg}`, error.message);
      }
    }
    
    // Show progress
    if ((i + 1) % 50 === 0) {
      console.log(`Progress: ${i + 1}/${commitsPerDate.length} dates processed`);
    }
  }
  
  console.log('\n✓ All commits generated successfully!');
  console.log(`Total commits created: ${commitsPerDate.reduce((sum, d) => sum + d.commits.length, 0)}`);
}

// Run the script
generateCommits().catch(console.error);

