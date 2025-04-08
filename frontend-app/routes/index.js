// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
// //
var express = require('express');
var axios =require('axios');
const { verifyAuth } = require('../utils/verifyToken');

const router = express.Router();

//Render Home Page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Render Login Page
router.get("/login", (req, res) => {
  res.render("login", { title: "Login", error: null });
});

// Render Signup Page
router.get("/register", (req, res) => {
  res.render("register", { title: "Register", error: null });
});

//Redirect to home page(Logout).
// router.get('/logout',(req, res) => {
//    res.redirect("/");
// })

// Handle Login Submission
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8800/api/auth/login", req.body); // Pointing to your backend API
    console.log("Login successful:", response.data.user);

    res.cookie("access_token",response.data.token,{
      httpOnly: true,
      // secure: true, // Use HTTPS in production // response.data.token, 
      // sameSite: "strict",
    });
    // Redirect on success
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    res.render("login", { title: "Login", error: "Invaild Credentials" });
  }
});

// Handle Signup Submission
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8800/api/auth/register", req.body ,{ withCredentials: true }); 
    console.log("User registered successfully");
    // Redirect on success
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    res.render("register", { title: "Register", error: "Registration failed" });
  }
});

//handle Logout
router.get("/logout", async (req, res) => {
  try {
    await axios.get("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
    
    res.clearCookie("access_token", {
      httpOnly: true,
    });
    
    // Redirect to login page after logout
   res.redirect("/");
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    res.redirect("/dashboard"); // Stay on dashboard if logout fails
  }
});


router.get("/dashboard",verifyAuth, (req, res) => {
  // Render a dashboard view
  res.render("dashboard", { title: "Dashboard" });
});

router.get('/menu', (req, res) => {
  const category = req.query.category || 'All';
  const menu_list = [
    { menu_name: 'Salad', menu_image: '/assets/menu_1.png' },
    { menu_name: 'Rolls', menu_image: '/assets/menu_2.png' },
    { menu_name: 'Desserts', menu_image: '/assets/menu_3.png' },
    { menu_name: 'Sandwich', menu_image: '/assets/menu_4.png' },
    { menu_name: 'Cake', menu_image: '/assets/menu_5.png' },
    { menu_name: 'Pure Veg', menu_image: '/assets/menu_6.png' },
    { menu_name: 'Pasta', menu_image: '/assets/menu_7.png' },
    { menu_name: 'Noodles', menu_image: '/assets/menu_8.png' },

    // Add more items as needed
  ];

  res.render('exploreMenu', { category, menu_list });
});


module.exports = router;