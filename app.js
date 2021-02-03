const express = require("express")
const bodyParser = require('body-parser')
const axios = require('axios');


const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

//API KEY 
const apiKey = "0215c777de32c6e712cdaea95f471c8b";


app.get("/", function(req, res){
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey+ '&language=en-US&page=1')
    .then(response => {
      
      res.render('home', {upcomingMovies: response.data.results, page: response.data.page, pages: response.data.total_pages })
      
    })
    .catch(error => {
      console.log(error);
    });
    
})

app.get("/movies/:movieId", function(req, res){
  
  const movieId = req.params.movieId
  axios.get('https://api.themoviedb.org/3/movie/'+ movieId +'?api_key='+ apiKey + '&language=en-US&append_to_response=release_dates,credits')
  .then(response => {
    
    res.render('movie', {movieData: response.data, movieCertification: response.data.release_dates.results, movieCast: response.data.credits.cast})
    
  })
  .catch(error => {
    console.log(error);
  });
  
})

app.get("/page:pageNumber", function(req, res){
  const pageNumber = req.params.pageNumber
  axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey+ '&language=en-US&page=' + pageNumber)
  .then(response => {
    
    res.render('home', {upcomingMovies: response.data.results, page: response.data.page, pages: response.data.total_pages })
    
  })
  .catch(error => {
    console.log(error);
  });
  
})




app.get("/tv", function(req, res) {
  axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=' + apiKey+ '&language=en-US&page=1')
  .then(response => {
    
    res.render('tv', {tvOnTheAir: response.data.results, page: response.data.page, pages: response.data.total_pages})
    
  })
  .catch(error => {
    console.log(error);
  });
})

app.get("/tv/:tvShowId", function(req, res) {
  const tvShowId = req.params.tvShowId
  axios.get('https://api.themoviedb.org/3/tv/' + tvShowId + '?api_key='+ apiKey+'&language=en-US&append_to_response=content_ratings,credits')
  .then(response => {
    
    res.render('tv-show', {tvShowData: response.data, tvShowCertification: response.data.content_ratings.results, tvShowCast: response.data.credits.cast})
    
  })
  .catch(error => {
    console.log(error);
  });
})

app.get("/tv/page:pageNumber", function(req, res) {
  const pageNumber = req.params.pageNumber
  axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=' + apiKey+ '&language=en-US&page=' + pageNumber)
  .then(response => {
    
    res.render('tv', {tvOnTheAir: response.data.results, page: response.data.page, pages: response.data.total_pages})
    
  })
  .catch(error => {
    console.log(error);
  });
})



app.post("/", function(req, res){
    const input = req.body.search
    
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey +'&query='+ input +'&page=1')
  .then(response => {
    
    res.render('results', {movies: response.data.results})
    
  })
  .catch(error => {
    console.log(error);
  });
})













app.listen(3000, function(){
    console.log("Server is running on port 3000")
  })

