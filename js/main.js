// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- Part 1: adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
    center: [47.78869, 13.06],
    zoom: 13
});


//adding base map/s 

// add open street map as base layer
var osmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// for using the two base maps in the layer control, I defined a baseMaps variable
var baseMaps = {
    "Open Street Map": osmap
}

//
//---- Part 2: Adding a scale bar
//
L.control.scale({ position: 'bottomright', imperial: false }).addTo(map);

//
//---- Part 3: adding GeoJSON line features 
//

//Task: please add here the GEOJSON line features contained in the mwalk file


const sidebarTitle = document.getElementById("amenityName");
const sidebarText = document.getElementById("amenityInfo");
const sidebarPic = document.getElementById("link")


var currentClickedMarker = null;




var icons = [
    L.icon({
        iconUrl: 'data/WIST.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41]
    }),
    L.icon({
        iconUrl: 'data/ELSE.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41]
    }),
    L.icon({
        iconUrl: 'data/KHSW.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41]
    }),
    L.icon({
        iconUrl: 'data/SSTW.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41]
    }),
    L.icon({
        iconUrl: 'data/Techno_Z.png',
        iconSize: [25, 25],
        iconAnchor: [12, 41]
    })
];


var enlargedIcons = [
    L.icon({
        iconUrl: 'data/WIST.png',
        iconSize: [35, 35],
        iconAnchor: [15, 49]
    }),
    L.icon({
        iconUrl: 'data/ELSE.png',
        iconSize: [35, 35],
        iconAnchor: [15, 49]
    }),
    L.icon({
        iconUrl: 'data/KHSW.png',
        iconSize: [35, 35],
        iconAnchor: [15, 49]
    }),
    L.icon({
        iconUrl: 'data/SSTW.png',
        iconSize: [35, 35],
        iconAnchor: [15, 49]
    }),
    L.icon({
        iconUrl: 'data/Techno_Z.png',
        iconSize: [35, 35],
        iconAnchor: [15, 49]
    })
];


var currentClickedMarker = null;


var layers = {};


var geojsonDataArray = [
    { name: 'WIST', data: WIST },
    { name: 'ELSE', data: ELSE },
    { name: 'KHSW', data: KHSW },
    { name: 'SSTW', data: SSTW },
    { name: 'Techno_Z', data: Techno_Z }
];

for (let i = 0; i < geojsonDataArray.length; i++) {
    addGeoJSONToMap(geojsonDataArray[i].data, geojsonDataArray[i].name, icons[i], enlargedIcons[i]);
}

function addGeoJSONToMap(geojsonData, layerName, icon, enlargedIcon) {
    var layer = L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: icon });
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.on('mouseover', function (e) {
                    layer.setIcon(enlargedIcon);
                    currentHoveredMarker = layer;
                });
                layer.bindTooltip(feature.properties.name);
                layer.on('mouseout', function (e) {

                    layer.setIcon(icon);

                });

                /* layer.bindTooltip(feature.properties.name);*/

            }
            if (feature.properties && feature.properties.Address) {
                layer.on('click', function () {

                    if (!layer._popup) {
                        layer.bindPopup(feature.properties.Address).openPopup();

                    }
                    document.getElementById('amenityName').innerHTML = "<a>" + feature.properties.name + "</a>";
                    document.getElementById('amenityInfo').innerHTML = "<a>" + feature.properties.Info + "</a>";
                    document.getElementById('link').innerHTML = '<a href="' + feature.properties.Link + '" target="_blank">'
                        + feature.properties.Link + '</a>';
                    /* layer.setIcon(enlargedIcon);*/
                });
            }
        }
    }).addTo(map);

    layers[layerName] = layer;
}
/*

for (let i = 0; i < geojsonDataArray.length; i++) {
    addGeoJSONToMap(geojsonDataArray[i].data, geojsonDataArray[i].name, icons[i], enlargedIcons[i]);
}
*/

L.control.layers(null, layers).addTo(map);

/*
map.on('click', function () {
    console.log('trigger')
    if (currentClickedMarker) {
        console.log('trigger')
        resetMarkerSize(currentClickedMarker);
        currentClickedMarker = null;
        
    }
});


function resetMarkerSize(marker) {
    var iconIndex = geojsonDataArray.findIndex(item => layers[item.name].hasLayer(marker));
    if (iconIndex !== -1) {
        console.log(inconIndex)
        marker.setIcon(icons[iconIndex]);
    }
}*/


//
//---- Part 4: adding an event to the map
//

//when you click in the map, an alert with the latitude and longitude coordinates of the click location is shown
// e is the event object that is created on mouse click


map.addEventListener('dblclick', function (e) {
    alert(e.latlng);
});



//the same functionality can be realized with reference to the function onClick

/*
//definition of the function onClick
function onClick(evt){
    alert(evt.latlng);
}
*/
//map.addEventListener('click', onClick);

//short version (on is an alias for addEventListener):
//map.on('click', onClick);



//
//---- Part 5: Adding GeoJSON features and interactivity
//

/*var parks;


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

parks = L.geoJson(npark, {
    style: {
        color: "#D34137",
        weight: 5},
    onEachFeature: function (feature, layer) {
        layer.on('click', zoomToFeature);}
        //you can also write:
        //layer.on({click: zoomToFeature}); }
});


parks.addTo(map); */



//
//---- Part 6: Adding GeoJSON features and several forms of interactivity
//comment out part 5 before testing part 6

/*
function highlightFeature(e) {
    var activefeature = e.target;  //access to activefeature that was hovered over through e.target

    activefeature.setStyle({
        weight: 8,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        activefeature.bringToFront();
    }
}

//function for resetting the highlight
function resetHighlight(e) {
    Dorm_WIST.resetStyle(e.target);
}
*/
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//to call these methods we need to add listeners to our features

function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var myParkStyle = {
    color: "#D34137",
    weight: 5,
    opacity: 0.65
}
/*
parks = L.geoJson(npark, {
    style: myParkStyle,
    onEachFeature: interactiveFunction
}).addTo(map);
*/



//
//---- Part 7: adding GeoJSON point features to marker object
//

//Task: extend the content of the Popup with the height information and the latlng coordinates of the summits
/*
var summitsJson = {
    "type": "FeatureCollection",
    "features": [{ "type": "Feature", "properties": { "NAME": "Kreuzkogel", "HEIGHT": 2027 }, "geometry": { "type": "Point", "coordinates": [13.153268433907614, 47.22421002245328] } },
    { "type": "Feature", "properties": { "NAME": "Fulseck", "HEIGHT": 2034 }, "geometry": { "type": "Point", "coordinates": [13.147417093794559, 47.23423788545316] } },
    { "type": "Feature", "properties": { "NAME": "Kieserl", "HEIGHT": 1953 }, "geometry": { "type": "Point", "coordinates": [13.152967420479607, 47.24300413792524] } }]
};


var myIconsummit = L.icon({
    iconUrl: 'css/images/Summit.png',
    iconSize: [18, 18]
});


var summits = L.geoJson(summitsJson, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: myIconsummit, title: "Summits in Salzburg" });
    },
    onEachFeature: function (feature, marker) {
        marker.bindPopup("Summit: " + feature.properties.NAME + "</br>"
            + "Height: " + feature.properties.HEIGHT + ' meters</br>'
            + marker.getLatLng()

        );
    }
});

summits.addTo(map);*/



//
//---- Part 8: Adding a layer control for base maps and feature layers
//
/*
//the variable features lists layers that I want to control with the layer control
var features = {
    "WIST": Dorm_WIST,
    "ELSE": Dorm_ELSE,
    "SSTW": Dorm_SSTW,
    "KatholicheKatholisches Hochschulwerk Salzburg": Dorm_KHSW,
    "Techno_Z": Dorm_Techno

}

//the legend uses the layer control with entries for the base maps and two of the layers we added
//in case either base maps or features are not used in the layer control, the respective element in the properties is null

L.control.layers(null, features, { position: 'topleft' }).addTo(map);*/











