const tmdb = require('tmdbv3').init('88387aa2b0ade4e2eb90132f7740ef17');//&language=ko

//tmdb.misc.latest((err ,res) => {
//	console.log(res);
//});

//tmdb.search.movie('군함도', (err ,res) => {
//	console.log(res);	
//});

//tmdb.movie.info('436391', (err ,res) => {
//	console.log(res);	
//});

//tmdb.genre.movies('11', (err ,res) => {
//	console.log(res);	
//})

tmdb.genre.list((err ,res) => {
	console.log(res);	
})

//tmdb.person.info(109, (err ,res) => {
//	console.log(res.name);	
//});