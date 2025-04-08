var express = require('express');
var router = express.Router();
var axios = require('axios')


 const url = 'http://localhost:8800'
// Add page
router.get('/add', (req, res) => {
  res.render('add', { title: 'Add Food',url ,data : {}});
});

// List page
router.get('/list', async (req, res) => {
  try {
    const response = await axios.get(`${url}/api/food/list`);
   // const foodList = response.data.data; // Access the 'data' property which contains the food items
  // console.log(response.data.data)
    res.render('list', {
      title: 'List Food',
      list: response.data.data,
      url
    });
  } catch (err) {
    console.error('Error fetching food list:', err);
    res.render('list', {
      title: 'List Food',
      list: [],
      url
    });
  }
});
// Orders page
router.get('/orders', (req, res) => {
  res.render('orders', { title: 'Orders' ,url,data : {} });
});

module.exports = router;
