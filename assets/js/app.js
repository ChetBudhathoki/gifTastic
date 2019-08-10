var topics = [
	"eliud Kipchoge",
	"paula radcliffe",
    "mo farah",
    "molly huddle",
    "galen rupp",
	"usain bolt",
	"dennis kimetto",
	"kenenisa bekele",
	"wilson kipsang",
	"emmanuel mutai",
	"mule wasihun",
	"getaneh molla",
	"patrick makau",
	"ryan hall"
];

for(var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-run", topics[i]);
	button.addClass("run-button");
	$("#button-group").append(button);
}

$("#add-run-button").on("click", function(pd) {
	pd.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("#new-run-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("#new-run-input").val() !== "" && alreadyExist === false) {
		var newRun = $("#new-run-input").val().toLowerCase();
		topics.push(newRun);
		var button = $("<button>").text(newRun);
		button.attr("data-run", newRun);
		button.addClass("run-button");
		$("#button-group").append(button);
	}
	$("#new-run-input").val("");
});

$(document).on("click", ".run-button", function() {
	var run = $(this).attr("data-run");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        run + "&api_key=yeanJWsnS3A0lkybvEZlsOcXS7eqn6hS";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	// console.log(results);

		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {       
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var runImg = $("<img class='result'>");
    		runImg.attr("src", results[i].images.fixed_height_still.url);
    		runImg.attr("data-state", "still");
    		runImg.attr("data-still", results[i].images.fixed_height_still.url);
    		runImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(runImg);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#running-group").prepend(resultsContainerSection);
    });
});

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});