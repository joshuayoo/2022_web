#

## 출처

### 1. https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do

#### ◉ api key : 8ccb75d448656cc7c6edf10d9e6d45e7

## 88387aa2b0ade4e2eb90132f7740ef17

## {
##   genres: [
##     { id: 28, name: '액션' },
##     { id: 12, name: '모험' },
##     { id: 16, name: '애니메이션' },
##     { id: 35, name: '코미디' },
##     { id: 80, name: '범죄' },
##     { id: 99, name: '다큐멘터리' },
##     { id: 18, name: '드라마' },
##     { id: 10751, name: '가족' },
##     { id: 14, name: '판타지' },
##     { id: 36, name: '역사' },
##     { id: 27, name: '공포' },
##     { id: 10402, name: '음악' },
##     { id: 9648, name: '미스터리' },
##     { id: 10749, name: '로맨스' },
##     { id: 878, name: 'SF' },
##     { id: 10770, name: 'TV 영화' },
##     { id: 53, name: '스릴러' },
##     { id: 10752, name: '전쟁' },
##     { id: 37, name: '서부' }
##   ]
## }

## 
## {
##   genres: [
##     { id: 28, name: 'Action' },
##     { id: 12, name: 'Adventure' },
##     { id: 16, name: 'Animation' },
##     { id: 35, name: 'Comedy' },
##     { id: 80, name: 'Crime' },
##     { id: 99, name: 'Documentary' },
##     { id: 18, name: 'Drama' },
##     { id: 10751, name: 'Family' },
##     { id: 14, name: 'Fantasy' },
##     { id: 36, name: 'History' },
##     { id: 27, name: 'Horror' },
##     { id: 10402, name: 'Music' },
##     { id: 9648, name: 'Mystery' },
##     { id: 10749, name: 'Romance' },
##     { id: 878, name: 'Science Fiction' },
##     { id: 10770, name: 'TV Movie' },
##     { id: 53, name: 'Thriller' },
##     { id: 10752, name: 'War' },
##     { id: 37, name: 'Western' }
##   ]
## }


INSERT INTO `user` (`id`,`passward`, `phone`, `email`, `Action`, `Adventure`, `Animation`, `Comedy`, `Crime`, `Documentary`, `Drama`, `Family`, `Fantasy`, `History`, `Horror`, `Music`, `Mystery`, `Romance`, `Science_Fiction`, `TV_Movie`, `Thriller`, `War`, `Western`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);