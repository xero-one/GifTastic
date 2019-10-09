$(document).ready(function() {
    var api_Key = "a3FpCX4MZLFKJwAq2Yk0VXHinpIzsYDf";
    var rangeOfGIFsDisplayed = 30;
    
    function makeButton(){
        for(var i = 0; i < Country.length; i++) {
            const createButton = $("<button>");

            /*The section where "create Button" gets added classes and appended to the button container*/
            createButton.addClass("country-button");
            createButton.addClass("button");
            createButton.text(Country[i]);
            $("#button-container").append(createButton);
        }


        
        $(".country-button").off("click");
        
        $(".country-button").on("click", function(){
            $(".gif-image").off("click");
            $("#gif-section").removeClass("button-div");
            $("#gif-section").empty();

            floodGIFSection($(this).text());

            console.log(makeButton);
        });
    
    }
    
    function addButton(show){
        if(Country.indexOf(show) === -1) {
            Country.push(show);
            $("#button-container").empty();
            makeButton();
        }
    }

    /*Function for populating the GIF section on the page*/
    function floodGIFSection(show){
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
            "&api_key=" + api_Key + "&rating=" + "&limit=" + rangeOfGIFsDisplayed,
           
            method: "GET"
        }).then(function(response){
            response.data.forEach(function(element){
                createDiv = $("<div>");
                createDiv.addClass("appended-gifs-section");
                createDiv.append("<p><b><center>Rating: " + element.rating.toUpperCase() + "</center></b></p>");

                /*Section for creting the GIF content and determine weather "static/still" or "animated" upon click*/
                    const createImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
                    createImage.addClass("gif-image");
                    createImage.attr("state", "still");
                    createImage.attr("still-data", element.images.fixed_height_still.url);
                    createImage.attr("animated-data", element.images.fixed_height.url);
                    createDiv.append(createImage);
                $("#gif-section").append(createDiv);

                console.log(response);
                console.log(element);
            });
            
            $("#gif-section").addClass("button-div");
            $(".gif-image").off("click");
            $(".gif-image").on("click", function(){
                if($(this).attr("state") === "still") {
                    $(this).attr("state", "animated");
                    $(this).attr("src", $(this).attr("animated-data"));
                }
                else {
                    $(this).attr("state", "still");
                    $(this).attr("src", $(this).attr("still-data"));
                }
            });
        });
    }
    
    $(document).ready(function(){
        makeButton();
        $("#submit").on("click", function(){
            event.preventDefault();
            addButton($("#country").val().trim());
            $("#country").val("");
        });
    });

})