// api example https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let inp=document.getElementById("city_name");
document.getElementById("mainForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    info_div.innerText="";
    print_info(inp.value);
});
let response,data;
let main_div=document.getElementById("main");
let info_div=document.getElementById("info");
async function print_info(city){
    try{
        info_div.innerHTML=`<h1>Loading...</h1>`;
        response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1eadbc47d47f7a558b56dfc16c38226`);
        // By default, OpenWeather returns values in standard units:
        // Temperature → Kelvin (K)
        // Wind speed → meters/second (m/s)
        // Pressure → hPa
        // Humidity → %
        // so we need to convert temp in degree celcius but we can ask api to give us in units.
        // so if we use api key as https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a1eadbc47d47f7a558b56dfc16c38226
        // Now you'll get:
        // Temperature → °C
        // Feels like → °C
        // Temp min/max → °C
        // Wind speed → m/s
        // so if you write api key as https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a1eadbc47d47f7a558b56dfc16c38226
        // Now you'll get:
        
        // Temperature → °F
        // Wind speed → miles/hour (mph)
        
        // here we have used simple api call so we will get data in default units.
        if(response.ok==false){
           // as we know in casse of response.status=404 our data or city was not found so we can show that and in all other cases we can just show that something went wrong.
           if(response.status==404){
                throw new Error("City Not Fount!");
           }
           else throw new Error("Something Went Wrong!")
       }        
        data=await response.json();
        
        // so data is an object inside which we hace various keys and we will use some of them  which are , 
        // 1.) "weather" :  to find the condition i.e weather cloudy, dizzle , sunny ,etc so wwill insert the image according to it and also the description like clear sky or scattered sky etc..
        // 2.) "main" : to find temp and humidity.
        // 3.) "wind" : to find wind speed.
        // 4.) "sys" : to find country.
        // 5.) "name" : to find city although we enter it in the input
        // so firstly lets find the condition.
        let cond=data["weather"][0]["main"]; // so inside data "weather" was an array and on its 0th index was a obj inside which key "main" was there which contains the condition info.
        
        let cond_ele=document.createElement("img"); // as element can be image if condition matched with available images we have other wise we will just make a paragraph and write condition in it and display.
        
        // now can as condition have different value according to which we will insert the image.
        
        switch(cond){
            case "Clear":
                cond_ele.src="clear.png";
                break;
            case "Clouds":
                cond_ele.src="clouds.png";
                break;
            case "Drizzle":
                cond_ele.src="drizzle.png";
                break;
            case "Rain":
                cond_ele.src="rain.png";
                break;
            case "Snow":
                cond_ele.src="snow.png";
                break;
            case "Mist":
                cond_ele.src="mist.png";
                break;
            default:
                cond_ele=document.createElement("h2");
                cond_ele.innerText=cond;
        }
        
        let description=data["weather"][0]["description"]; // as inside data we have weather array which contains object at index 0 and one of its key is "description".
        let desc_ele=document.createElement("h1");
        desc_ele.innerText=description;
        desc_ele.style.textTransform="capitalize";
 
        
        let temp=data["main"]["temp"]-273.15; // as inside data there is a key "main" which contains a n object having key "temp" , but as temp is in kelvin so convert it to celcius;
        temp=temp.toFixed(2); // to fix the temp to 2 decimal places.
        let temp_ele=document.createElement("h1"); 
        temp_ele.innerHTML=`${temp}&deg;C`;
        temp_ele.style.color="white";
        let main_city=data["name"]; // as data contains key "name" that represent city name.
        let country_code=data["sys"]["country"]; // as in data "sys" is a key which contain object and have key "country" which represents country code.
        // java script provides a function to convert country code to country name.
        // firstly create a code to country converter 
        const regionNames = new Intl.DisplayNames( // like internataional display names.
            ['en'], // language english , if you wriy=te hin you will get county name in hindi.
            { type: 'region' } // give name acc to region.
        );            
        let country=regionNames.of(country_code);
        let place_ele=document.createElement("h2");
        place_ele.innerText=`${main_city},${country}`;
        
        
        let lower_div=document.createElement("div"); // the div below place conatining info of humidity and speed.
        lower_div.className="lower"; // as it is in lower side. 
        
        
        
        
        let humidity=data["main"]["humidity"]; // as data has a key "main" and it contains object which has key "humidity".
        let humid_div=document.createElement("div");
        humid_div.className="lower_outer"; // present in lower div but are outer. 
        humid_div.innerHTML=`
            <span><img src="humidity.png"></span>
            <div id="humid_info" class="lower_inner">
                <h2>${humidity}% <br> Humidity</h2>
            </div>
        `; // so the inner's div class we kept as lower_inner as prsent in lower div and are inner.
        
        
        
        let wind=data["wind"]["speed"] // as data has a key "wind" and it contains object which has key "speed".
        let wind_div=document.createElement("div");
        wind_div.className="lower_outer"; // as present in lower but are outer.
        wind_div.innerHTML=` 
            <span><img src="wind.png"></span>
            <div id="wind_info" class="lower_inner"> 
                <h2>${wind} m/s<br>Wind</h2>
            </div>
        `; // so the inner's div class we kept as lower_inner as prsent in lower div and are inner.
         
        // so we setteled the properties(CSS) of the div and images of other_div in the style tag. 
        lower_div.append(humid_div);
        lower_div.append(wind_div);
        
        
        
        info_div.innerText=""; // as to delete the loading sign.
        info_div.append(cond_ele);
        info_div.append(desc_ele);
        info_div.append(temp_ele);
        info_div.append(place_ele);
        info_div.append(lower_div);
    }
    catch(err){
        info_div.innerText=""; // to remove the loading sign.
        if(navigator.onLine==false){ // means no internet connection.
            info_div.innerHTML = `<h1>No Internet Connection</h1>`;
        }
        else info_div.innerHTML = `<h1>${err.message} </h1>`;
    }
}