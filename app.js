const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurant_list = require('./restaurant.json')

//定義引擎
app.engine('handlebars', engine({ extname: 'handlebars', defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//css.js
app.use(express.static('public'))

//index
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurant_list.results })
})

//search
app.get('/search/', (req, res) => {
  const keyword = req.query.keyword
  const filter_restaurant = restaurant_list.results.filter(item => item.name.toLowerCase().includes(keyword.trim().toLowerCase()) || item.category.includes(keyword.trim()))
  //加入搜尋不到頁面
  if (filter_restaurant == '') {
    res.render('noResult', { keyword: keyword })
  } else {
    res.render('index', { restaurant: filter_restaurant, keyword })
  }
})

//show
app.get('/restaurants/:id', (req, res) => {
  const idNumber = req.params.id
  const show_restaurant = restaurant_list.results.find(item => item.id.toString() === idNumber)
  res.render('show', { restaurant: show_restaurant })
})

//監聽
app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
})