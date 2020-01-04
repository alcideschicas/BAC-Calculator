function goForward() {

	var path = window.location.pathname;
	var page = path.split("/").pop();

	if (page == "index.html") {
		window.location.href = "body.html";
	} else if (page == "body.html") {

		if (typeof(Storage) !== "undefined") {
		  localStorage.setItem("weight", document.getElementById("weight").value);
		} else {
 		  alert("Local Storage Not Supported");
		}
		window.location.href = "add.html";

	} else if (page == "add.html") {
		window.location.href = "drinkinfo.html";

	} else if (page == "drinkinfo.html") {
		addDrink();
		window.location.href = "add.html";

	} else if (page == "time.html") {

		localStorage.setItem("hours", document.getElementById("hours").value);
		localStorage.setItem("minutes", document.getElementById("minutes").value);

		calcBAC();
		window.location.href = "bac.html";

	} else if (page == "bac.html") {
		window.location.href = "index.html";
	}
}

function goBack() {

	var path = window.location.pathname;
	var page = path.split("/").pop();

	if (page == "body.html") {
		window.location.href = "index.html";
	} else if (page == "add.html") {
		window.location.href = "body.html";
	} else if (page == "drinkinfo.html") {
		window.location.href = "add.html";
	} else if (page == "time.html") {
		window.location.href = "add.html";
	} else if (page == "bac.html") {
		window.location.href = "time.html";
	}
}

function chooseGender(gender) {

	if (gender == 0) {
		document.getElementById("male").style.backgroundColor = "#3498db";
		document.getElementById("female").style.backgroundColor = "#00CFFF";
		localStorage.setItem("gender", "male");
	} else {
		document.getElementById("female").style.backgroundColor = "#3498db";
		document.getElementById("male").style.backgroundColor = "#00CFFF";
		localStorage.setItem("gender", "female");
	}
}

function calcBAC() {
	
	var drinks = JSON.parse(localStorage.getItem("drinkList"));

	var A = 0;

	// Alcohol of all drinks
	for (var drink in drinks) {
		A += Number(drinks[drink].drink_oz) * (Number(drinks[drink].drink_abv) / 100);
	}

	var time = Number(localStorage.getItem("hours")) + (Number(localStorage.getItem("minutes")) / 60);
	var BAC;

	// Calculates BAC
	if (localStorage.getItem("gender") == "male") {
		BAC = ((A * 5.14) / (Number(localStorage.getItem("weight")) * .73)) - (.015 * time);
	} else if (localStorage.getItem("gender") == "female") {
		BAC = ((A * 5.14) / (Number(localStorage.getItem("weight")) * .66)) - (.015 * time);
	}

	BAC = Math.round(100 * BAC) / 100; 

	if (BAC < 0) {BAC = 0;}

	localStorage.setItem("BAC", BAC);
}

function loadBAC() {

	// Round to nearest hundreth
	var bac = localStorage.getItem("BAC"); 
	document.getElementById("bac").innerHTML = bac + "%";

	if (bac >= 0.08) {
		document.getElementById("warning").innerHTML = "Warning: It is illegal to drive at this level.";
	} else {
		document.getElementById("warning").parentNode.removeChild(document.getElementById("warning"));
	}


	// BAC info
	if (bac < 0.02) {
		document.getElementById("feel").innerHTML = "You are fine.";
	} else if (bac > 0.01 && bac < 0.04) {
		document.getElementById("feel").innerHTML = "No loss of coordination, slight euphoria and loss of shyness. Mildly relaxed and maybe a little lightheaded.";
	} else if (bac > 0.03 && bac < 0.07) {
		document.getElementById("feel").innerHTML = "Feeling of well-being, lower inhibitions, and relaxation. Judgment is slightly impaired. Minor impairment of reasoning and memory, and less cautious. Your behavior can become exaggerated and emotions (ex. happiness or sadness) felt more intensely.";
	} else if (bac > 0.06 && bac < 0.1) {
		document.getElementById("feel").innerHTML = "Impairment present. Driving skills such as vision, steering, lane changing and reaction time are impaired along with balance, speech, and hearing. Feelings of Euphoria in some. Self-control and caution are reduced. Riskier behaviors displayed. Judgment, reason and memory suffer. You are likely to believe that you are functioning better than you really are.";
	} else if (bac > 0.09 && bac < 0.13) {
		document.getElementById("feel").innerHTML = "Significant impairment to motor coordination and loss of good judgment. Speech may be slurred; balance, vision, reaction time and hearing will be impaired. Probably not thinking straight.";
	} else if (bac > 0.12 && bac < 0.16) {
		document.getElementById("feel").innerHTML = "Very obviously drunk. Severe impairment to judgment, perception, and major motor skills. Very slow reaction time. Blurred vision, loss of balance and slurred speech. Feelings of well being starting to be replaced by anxiety and restlessness (dysphoria). Vomiting common.";
	} else if (bac > 0.15 && bac < 0.2) {
		document.getElementById("feel").innerHTML = "The drinker has the appearance of a &quot;sloppy drunk.&quot; At this point, most drinkers begin to feel incapacitated. Many social drinkers will pass out. Nausea begins to set in and the drinker has difficulty focusing on any object.";
	} else if (bac > 0.19 && bac < 0.25) {
		document.getElementById("feel").innerHTML = "Out of it. Confused. Dizzy. Requires help to stand or walk. If injured may not feel the pain. Nausea and vomiting. The gag reflex is impaired and you can choke if you do vomit. Blackouts are likely.";
	} else if (bac > 0.24 && bac < 0.3) {
		document.getElementById("feel").innerHTML = "All mental, physical and sensory functions are severely impaired. Near total loss of motor function control. Increased risk of asphyxiation from choking on vomit and of seriously injuring yourself by falls or other accidents.";
	} else if (bac > 0.29 && bac < 0.41) {
		document.getElementById("feel").innerHTML = "Extremely life threatening. You have little comprehension of where you are. You may pass out suddenly and be difficult to awaken. Complete unconsciousness. Coma is possible. This is the level of surgical anesthesia. Death may occur.";
	} else if (bac > 0.40) {
		document.getElementById("feel").innerHTML = "Death will occur in most people";
	} else {
		document.getElementById("feel").innerHTML = "More information needed.";
	}
} 

function loadDrinks() {

	// Check if drinks exist
	if (localStorage.getItem("drinkList") != null) {
		var drinks = JSON.parse(localStorage.getItem("drinkList"));

		// Displays drink names
		for (var drink in drinks) {
			var drink_name = document.createElement("h4");
			drink_name.className = "drinkList";
			drink_name.id = "drink" + drink;
			var node = document.createTextNode(drinks[drink].drink_name);
			drink_name.appendChild(node);
			var element = document.getElementById("add-drink");
			element.appendChild(drink_name);

			// Add delete button to each drink
			var delete_button = document.createElement("button");
			delete_button.innerHTML = "X";
			delete_button.className = "remove-button";
			delete_button.id = drink;
			drink_name.appendChild(delete_button);
		}

		// Removes drink from list
		for (drink in drinks) {
			document.getElementById(drink).onclick = function(s) {
				var index = s.target.id;
				drinks.splice(index, 1);
				document.getElementById("drink" + index).parentNode.removeChild(document.getElementById("drink" + index));
				localStorage.setItem("drinkList", JSON.stringify(drinks));
			};
		}

		// Adds go forward to time button once at least 1 drink is added
		var time_button = document.createElement("button");
		time_button.className = "button-next";
		time_button.id = "forward";
		time_button.innerHTML = "&rarr;";
		time_button.onclick = function() {window.location.href = "time.html";};
		var element = document.getElementById("drink-contain"); 
		element.appendChild(time_button);

		// Removes go forward button if no drinks are added
		if (drinks.length < 1) {
			document.getElementById("forward").parentNode.removeChild(document.getElementById("forward"));
		}
	}
}

function addDrink() {

	// Gets inputted drinks
	var name = document.getElementById("drink-name").value;
	var abv = document.getElementById("abv").value;
	var oz = document.getElementById("oz").value;

	// Checks to see if all fields have been inputted
	if (name != '' && abv != '' && oz != '') {
	
		var newDrink = {drink_name: name, drink_abv: abv, drink_oz: oz};
		var drinkList;

		// Adds drinks to a list in storage
		if (localStorage.getItem("drinkList") == null) {
			drinkList = [];
			drinkList.push(newDrink);
			localStorage.setItem("drinkList", JSON.stringify(drinkList));
		} else {
			drinkList = JSON.parse(localStorage.getItem("drinkList"));
			drinkList.push(newDrink);
			localStorage.setItem("drinkList", JSON.stringify(drinkList));
		}
	}
}

// Clears all drinks at the beginning of program
function clearStorage() {
	if (localStorage.length > 0) {localStorage.clear();}
}