<h1>Weather Explorer </h1>

<p> A simple and responsive weather application built using <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>. The app fetches real-time weather data from the OpenWeather API and displays weather conditions, temperature, humidity, wind speed, and location information for any city entered by the user. </p>

<h2>Features</h2>

<ul> <li>Search weather by city name</li> <li>Real-time weather data using OpenWeather API</li> <li>Displays weather condition with icons</li> <li>Shows temperature in Celsius</li> <li>Displays humidity percentage</li> <li>Displays wind speed</li> <li>Shows city and country name</li> <li>Loading indicator while fetching data</li> <li>Error handling for invalid city names</li> <li>Responsive and clean user interface</li> </ul>

<h2>How It Works</h2>

<ol> <li>User enters a city name.</li> <li>The application sends a request to the OpenWeather API.</li> <li>Weather data is fetched asynchronously using fetch() and async/await.</li> <li> The app extracts: <ul> <li>Weather condition</li> <li>Description</li> <li>Temperature</li> <li>Humidity</li> <li>Wind speed</li> <li>City and country</li> </ul> </li> <li>The information is dynamically displayed on the page using DOM manipulation.</li> </ol>
