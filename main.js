
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var playList = $('.playlist')
var listSong = $('.playlist')
var cd = $('.cd')

var playSong = $('.btn-toggle-play')
var playPause = $('.player')
var header = $('header h2')
var cdThumb = $('.cd-thumb')
var audio = $('#audio')

var iconLeft = $('.btn-prev')
var iconRight = $('.btn-next')

var rangeValue = $('#progress')

var songClick = $$('.song')

var randomSong = $('.btn-random')
var repeat = $('.btn-repeat')
const app = {
    songNumber: 0,
    isPlayElement: false,
    isRandomSong: false,
    isRepeat: false,
    songs: [
          {
            name: "Yêu Là Cưới (Chachacha) ",
            singer: "Nguyễn Đình Vũ",
            path: "video/video1.mp4",
            image: "http://data.voh.com.vn/voh/Image/2019/07/05/dinhvu1_20190705165250.jpg",
          },
          {
            name: "Viết Nên Chuyện Tình",
            singer: "Trịnh Thăng Bình",
            path: "video/song2.mp4",
            image:"https://vtv1.mediacdn.vn/thumb_w/650/2017/14452430623531445243062315-1500353205850-crop-1500353233069.jpg"
          },
          {
            name: "Chuyện Tình",
            singer: "Trịnh Thăng Bình",
            path:
              "video/song3.mp4",
            image: "https://cdn.vietnammoi.vn/stores/news_dataimages/thuynto/122016/05/12/2940_2.jpg"
          },
          {
            name: "Vùng Ký Ức (Cover)",
            singer: "Huỳnh Tú",
            path: "video/song4.mp4",
            image:
              "https://i.ytimg.com/vi/EojHPJ6XVps/maxresdefault.jpg"
          },
          {
            name: "Có Tất Cả nhưng Thiếu Anh (Cover) ",
            singer: "Vương Anh Tú",
            path: "video/song5.mp4",
            image:
              "https://i.ytimg.com/vi/LSjFMH1tsFc/maxresdefault.jpg"
          },
          {
            name: "Não Cá Vàng",
            singer: "Only C x Lou Hoàng",
            path:
              "video/song6.mp4",
            image:
              "https://avatar-ex-swe.nixcdn.com/playlist/2017/03/15/a/5/3/3/1489569024122_500.jpg"
          },
          {
            name: "Thấy Là Yêu Thương",
            singer: "Only C",
            path: "video/song7.mp4",
            image:
              "https://i.ytimg.com/vi/UX5oj9isGPM/maxresdefault.jpg"
          },
    ],

    render: function () {
        var songElement = app.songs.map(function (song,index) {
            return `
            <div class="song ${index === app.songNumber ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url(${song.image})">
                </div>
                <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playList.innerHTML = songElement.join('')


    },

    currentSongNumber: function () {
        return this.songs[this.songNumber]
    },

    loadSong: function () {
        header.textContent = this.currentSongNumber().name
        cdThumb.style.backgroundImage = `url(${this.currentSongNumber().image})`
        audio.src = this.currentSongNumber().path
    },

  

    handleElement: function () {
        var cdWidth = cd.offsetWidth
        var _this = this
        document.onscroll = function () {
            var scrollTops = window.scrollY || document.documentElement.scrollTop
            var newWidth = cdWidth - scrollTops
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }

        playSong.onclick = function () { 
          if(_this.isPlayElement) {
              _this.isPlayElement = false
              audio.pause()
              playPause.classList.remove('playing')
              cdThumb.classList.remove('cd-thumb-block')
          }else {
              _this.isPlayElement = true
              audio.play()
              playPause.classList.add('playing')
              cdThumb.classList.add('cd-thumb-block')
          }
        }
    },

    handleElementIcon: function () {

      // icon right click
      iconRight.onclick = function () {
          app.songNumber++
            if(app.songNumber > app.songs.length - 1 ) {
              app.songNumber = 0
            }
            app.loadSong()
            audio.play()
            playPause.classList.add('playing')
            cdThumb.classList.add('cd-thumb-block')
          app.render()
          app.scrollActiveSong()
      }
      // icon left click
      iconLeft.onclick = function () {
        app.songNumber--
        if(app.songNumber < 0) {
          app.songNumber = app.songs.length - 1 
        }
          app.loadSong()
        audio.play()
        playPause.classList.add('playing')
        cdThumb.classList.add('cd-thumb-block')
        app.render()
        app.scrollActiveSong()
      }

      // tua song

      audio.ontimeupdate = function () {
        if(audio.duration) {
          const progessPercent = Math.floor(audio.currentTime / audio.duration *100)
          rangeValue.value = progessPercent
        }
      }
      rangeValue.onchange = function (e) {
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
      }
    
    },
    
    randomSong: function () {
      randomSong.onclick = function () {
        if(this.isRandomSong) {
          this.isRandomSong = false
          randomSong.classList.remove('active')
        } else {
          this.isRandomSong = true
          randomSong.classList.add('active')
        }
        var newSong
        do {
          newSong = Math.floor(Math.random() * app.songs.length)
        }while(newSong === app.songs.length)
        app.loadSong()
      }
    },
    
    // xử lý khi nhạc chạy hết
    audioEnd:function () {
      audio.onended = function() {
          if(app.isRepeat) {
            audio.play()
          } else {
            iconRight.click()
          }
      }
    },
    startSong:function () {
      repeat.onclick = function () {
        app.isRepeat = !app.isRepeat
        repeat.classList.toggle('active',app.isRepeat)
      }
    },
    // bắt sự kiện click vào list nhạc
   
    // xử lý sự kiện khi list nhạc khuất màn hình
    scrollActiveSong:function () {
      setTimeout(() =>{
        $('.song.active').scrollIntoView({
          behavior:'smooth',
          block:'end'
        })
      },300 )
    },

    // xử lý khi click vào bài hát
    clickSongElement:function() {
      playList.onclick = function (e) {
        var songElement = e.target.closest('.song:not(.active)')
        if(songElement || e.target.closest('.option'))
        app.songNumber = Number(songElement.getAttribute('data-index'))
        app.loadSong()
        app.render()
        audio.play()
        playPause.classList.add('playing')
        cdThumb.classList.add('cd-thumb-block')
      }
    },
    // start function song
    start: function () {
        
        // render ra cac bai hat
        this.render()
        // dinh nghia ra object
        this.currentSongNumber()

        // xu ly cac su kien
        this.handleElement()

        // tai cac bai hat
        this.loadSong()

        // handle các icon điều hướng
        this.handleElementIcon()

        // randomSong 
        this.randomSong()

        // xử lý khi nhạc chạy hết 
        this.audioEnd()
        // xử lý khi click vào btn quay trở lai bài
        this.startSong()
        // xử lý khi click vào bài hát
        this.clickSongElement()
    },
}

app.start()