let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=42.882004&lon=74.582748&lang=ru&units=metric&appid=${key}`


let $temp=document.querySelector('.temp')
let $weatherMainImage=document.querySelector('.weatherMainImage')
let $today=document.querySelector('.today')
let $description=document.querySelector('.description')
let $wind=document.querySelector('.wind')
let $rain=document.querySelector('.rain')
let $listOfHours=document.querySelector('.listOfHours')
let $listOfDays=document.querySelector('.listOfDays')
let $date=document.querySelector('.date')
let weekend=['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье','понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'
]



fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
      $temp.textContent = data.current.temp + '°'
      $weatherMainImage.insertAdjacentHTML('afterbegin',`
      <img src='http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'>
      `)
      $today.innerHTML= `Сегодня, ${new Date().toLocaleDateString('ru-RU',{day:'numeric', month:'long'})}`
      $description.textContent=data.current.weather[0].description
      $wind.innerHTML=`<img src="./images/wind.svg"> <p>Ветер</p> | <p>${data.current.wind_speed}km/h</p>`
      $rain.innerHTML=`<img src="./images/rain.svg"> <p>Дождь</p> | <p>${data.current.humidity}%</p>`
      /////
      data.hourly.forEach((element,i) => {
        $listOfHours.insertAdjacentHTML('beforeend',`
        <div class="day">
        <p>${element.temp}</p>
        <img src='http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png'>
        <p>${new Date().getHours()-1+i}.00</p>
        </div>
        `)
      });
      /////
      data.daily.forEach((element,index)=>{
        $listOfDays.insertAdjacentHTML('beforeend',`
        <div class="day2">
        <p>${weekend[new Date().getDay()-1+index]}</p>
        <img src='http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png'>
        <span>${element.temp.day}</span>
        </div>
        `)
    })
    $date.innerHTML=`Сегодня, ${new Date().toLocaleDateString('ru-RU',{day:'numeric', month:'short'})}`

    })

let $btn = document.querySelector('#push')
let $current = document.querySelector('.current')
let $week = document.querySelector('.week')
let $btn2 = document.querySelector('#back')
$btn.addEventListener('click', function(){
    $current.style.display = 'none'
    $week.style.display = 'flex'
})  
$btn2.addEventListener('click', function(){
    $current.style.display = 'flex'
    $week.style.display = 'none'
})