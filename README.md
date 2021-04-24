# Project_GEM

## WHY PROJECT-GEM (GLOBAL ENTREPRENEURSHIP MONITOR)?


Fundamentally, entrepreneurs solve problems. But entrepreneurship happens within an economic, political, and cultural context that shapes new businesses to a remarkable degree. In one country, entrepreneurs are the highly educated elite choosing an aspirational path. In another, they are entrepreneurs-of-necessity because there are no other jobs. In some places, only the politically connected would consider launching a venture. In some, race, gender, or religion may be exclusionary, while in others, those are irrelevant factors. These differences across the regions are the compelling reasons for Project-GEM.

The project helps in better understanding of,
1. The perspectives of an entrepreneur on the country or the entrepreneurial ecosystem.
2. The factors that give entrepreneurs the confidence that they can build successful, value-adding and profitable companies.
3. The difference in government support and policies across different economies.

## TECHNOLOGIES

### Data Resources
1. .csv files: Approx. 2000 * 15 records.
2. geoJSON file: Contains polygon cordinates for countries with properties.


### Data Cleaning and Munging
Jupyter file: Used pandas, numpy, JSON, SQLAlchemy libraries from python to Extract, Clean, Tranform and Load the data.

### Database
PostgreSQL: Considered to use SQL as data was suitable for RDBMS.

### API
Flask App: Developed app for managing HTTP request and rendering data based on requirements.

### Frontend
HTML, CSS, Bootstrap, Javascript for web pages.

### Visualizations
1. Leaflet Map - Choropleth: To visualize the countries colored or patterned based on the behavior and attitude of entrepreneurs.
2. Plotly - Time Series: To analyze the trend for the parameters across years for different countries.
3. Chart.js - Doughnut Chart: To visualize weightage of all given Indicators for selected country.
4. D3 - Clustered Column Chart: To understand comparison between selected Indicators over the period of time.

## OUTCOME


### Behaviour and Attitudes Dashboard:
1. The decision to start a new business is the product of an individual’s attitudes,perceptions, and intentions, set within a social, cultural, and political context that could support or constrain that decision.
2. The Behaviour and Attitudes dashboard gives a clear picture of perspectives the entrepreneurs have across various dimensions.
3. The data from the past 20 years help stakeholders and the governments understand the trend over the years in different countries.
4. The map visualizes the 2019 data across the world.

### Framework Conditions Dashboard:
1. GEM assesses the environment for enterprise by defining a number of specific Entrepreneurship Framework Conditions.
2. These conditions, taken together, specify a local environment for enterprise that, for the person trying to start a new venture, will be supportive in some ways and constraining in others.
3. Individually and collectively, these conditions influence how easy, or how difficult, it is to start a new business and then develop that new venture into a sustainable established business.

Using these dashboards, local government officials, policymakers, stakeholders, business association leaders, and researchers can visualize the indicators that help in increasing the quality of the entrepreneurial ecosystem by benchmarking other countries and regions.

## GETTING STARTED

#### Folder Backend-code.

1. GEM_Workbook-Jupyter notebook containing code for extraction, cleaning and loading the postgres Database.
2. db_config.py- Add your postgres password before running the jupyter file.
3. app.py - Flask App for the data used in the dashboards.

#### Folder Frontend-code.

1. Run the index.html for the webpage.
2. Styles and images are in the resources.

##### Behaviour and Attitudes folder (Project_GEM\Frontend_code\Behaviour_and_Attitudes)

1. index.html(the dashboard page). 
2. static/js/logic.js - Javascript code for Plotly chart
3. static/js/map_logic.js and static/js/choropleth.js  -Javascript code for the map.
4. static/js/data_logic.js -for diplaying data in the data tab.
5. static/js/config.js - Please add your mapbox API key.
6. All the syles is in static/css/style.css.

##### Framework conditions folder (Project_GEM\Frontend_code\Framework_conditions)

1. index.html(the dashboard page). 
2. static/bar.js - Javascript code for D3 Clustered Column Chart
3. static/logic.js - Javascript code for Chart.js Doughnut Chart and displaying data for selection.
6. static/css/style.css - css styles for charts and Framework conditions dashboard
