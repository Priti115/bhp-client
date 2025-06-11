// Load locations from Flask API
function onPageLoad() {
    var url = "/get_location_names";  // ✅ Corrected API URL
    $.get(url, function (data, status) {
        console.log("Received response for get_location_names request:", data);
        if (data && data.locations) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty().append(new Option("Choose a location", "", true, true));
            for (var i in locations) {
                var opt = new Option(locations[i], locations[i]);
                uiLocations.appendChild(opt);
            }
        }
    }).fail(function () {
        console.log("Failed to fetch locations. Check API.");
    });
}


window.onload = onPageLoad;

// Function to get selected bathroom count
function getBathValue() {
    var uiBathroom = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathroom.length; i++) {
        if (uiBathroom[i].checked) {
            return parseInt(uiBathroom[i].value);
        }
    }
    return -1;
}

// Function to get selected BHK count
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1;
}

// Function to predict house rent price
function onClickEstimatePrice() {
    console.log("Estimate price button clicked");

    var location = document.getElementById("uiLocations").value;
    var BHK = getBHKValue();
    var bath = getBathValue();
    var sqft = document.getElementById("uiSqft").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    if (sqft === "" || location === "" || BHK === -1 || bath === -1) {
        alert("Please enter all values.");
        return;
    }

    var url = "/predict_home_price";  // ✅ correct
 
    // ✅pdated API URL

    $.post(url, {
        total_sqft: parseFloat(sqft),
        BHK: BHK,
        bath: bath,
        location: location
    }, function (data, status) {
        console.log("Response received:", data);
        if (data.estimated_price) {
            estPrice.innerHTML = "<h2>Estimated Price: " + data.estimated_price.toString() + " Lakh</h2>";
        } else {
            estPrice.innerHTML = "<h2>Error in Prediction</h2>";
        }
    }).fail(function () {
        console.log("Failed to fetch prediction. Check API.");
        alert("Error: Could not fetch prediction. Ensure API is running.");
    });
}
