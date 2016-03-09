/**
 * Created by Chisoft on 2016-02-24.
 */
/*jslint browser: true*/
/*global $, jQuery, alert*/

var yeast1 = 0.0;
var water1 = 0.0;
var sugar1 = 0.0;
var salt1 = 0.0;
var egg1 = 0.0;
var vanilla1 = 0.0;
var nutmeg1 = 0.0;
var flour1 = 0.0;
var euButter1 = 0.0;
var butter1 = 0.0;
var milk1 = 0.0;

var myPoint = 0;
var isRated = false;
var portions = 0;

$('#votes').text(getLocalStorage("key2"));
$('#average').text(getLocalStorage("key3"));


function rangeSlider(id, onDrag) {
    "use strict";

    var range = document.getElementById("range-slider-1"),
        dragger = range.children[0],
        draggerWidth = 10, // width of your dragger
        down = false,
        rangeWidth, rangeLeft;

    dragger.style.width = draggerWidth + 'px';
    dragger.style.left = -draggerWidth + 'px';
    dragger.style.marginLeft = (draggerWidth / 2) + 'px';

    range.addEventListener("mousedown", function (e) {
        rangeWidth = this.offsetWidth;
        rangeLeft = this.offsetLeft;
        down = true;
        updateDragger(e);
        return false;
    });

    document.addEventListener("mousemove", function (e) {
        updateDragger(e);
    });

    document.addEventListener("mouseup", function () {
        down = false;
    });

    function updateDragger(e) {
        if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
            dragger.style.left = e.pageX - rangeLeft - draggerWidth + 'px';
            if (typeof onDrag == "function") onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 10));
        }
    }

}


// Run!
var tempPortion = 0.0;
var text;

rangeSlider('range-slider-1', function (value) {
    text = ' guest';
    if (value == 0) {
        value = 1;
        text += "";
    } else {
        text += "s";
    }
    document.getElementById('test-result').innerHTML = value + text;
    document.getElementById("yeast").innerHTML = 0.25 * value;

    setLocalStorage("yeast", tempPortion);
    document.getElementById("egg").innerHTML = 1 * value;
    document.getElementById("water").innerHTML = 0.5 * value;
    document.getElementById("salt").innerHTML = 2.5 * value;
    document.getElementById("milk").innerHTML = 0.5 * value;
    document.getElementById("butter").innerHTML = 2 * value;
    document.getElementById("vanilla").innerHTML = 1 * value;
    document.getElementById("nutmeg").innerHTML = 0.125 * value;
    document.getElementById("flour").innerHTML = 1 * value;
    document.getElementById("euButter").innerHTML = 12 * value;

    document.getElementById("yeast2").innerHTML = 0.25 * value;
    document.getElementById("egg2").innerHTML = 1 * value;
    document.getElementById("water2").innerHTML = 0.5 * value;
    document.getElementById("salt2").innerHTML = 2.5 * value;
    document.getElementById("milk2").innerHTML = 0.5 * value;
    document.getElementById("butter2").innerHTML = 2 * value;
    document.getElementById("vanilla2").innerHTML = 1 * value;
    document.getElementById("nutmeg2").innerHTML = 0.125 * value;
    document.getElementById("flour2").innerHTML = 1 * value;
    document.getElementById("euButter").innerHTML = 12 * value;

    document.getElementById("euButter2").innerHTML = 6 * value;
    document.getElementById("euButter3").innerHTML = 6 * value;
});


var myUrl = "";

$(".ratingForm input").click(function () {
    var id = this.id;
    var apiKey = "";
    var bakegoods = "";
    if (id == "cronutForm") {
        apiKey = "cb760a3c289a1873";
        bakegoods = "cronut";
        console.log("this is cronut cake");
    }

    myUrl = "https://edu.oscarb.se/sjk15/api/recipe/?api_key=" + apiKey + "&recipe=" + bakegoods;
});


// fetch rating result
$('.ratingForm input').click(function () {

    if (!isRated) {
        $('#votes').html('<img src="../img/loader.gif">');
        $('#average').html('<img src="../img/loader.gif">');
        console.log($(this).attr("id"));

        $.ajax({
            method: "GET",
//			url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=" + apiKey + "&recipe=" + bakegoods,
            url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=cb760a3c289a1873&recipe=cronut",
            success: function (data) {
                console.log(JSON.stringify(data));
                $('#votes').text(data.votes);
                $('#average').text(data.rating.toFixed(1));
                setLocalStorage("key2", data.votes);
                setLocalStorage("key3", data.rating.toFixed(1));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
    setTimeout(function () {
        location.reload()
    }, 1000);
});

// rate
$('.ratingForm input').click(function () {
    if (!isRated) {
        myPoint = ($('input[name=rating]:checked', '.ratingForm').val());
        $(this).next().slideUp();
        $(this).next().slideDown();
        console.log("this element: " + this);

        $.ajax({
            method: "GET",
            url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=cb760a3c289a1873&recipe=cronut&rating=" + myPoint,
            success: function (data) {
                console.log(JSON.stringify(data));
                console.log("status: " + data.status);
                $('#myRating').text(myPoint);
                $(':radio:not(:checked)').attr('disabled', true);
                isRated = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }
});

$('.ratingForm label').hover(function () {
    if (!isRated) {
        var value = ($('input[name=rating]:hover', '.ratingForm').val());
        var i = 0;
        while (i <= value) {
            $('label[for=star' + i + ']').css('backgroundImage', "url('../img/star_pink.png')");
            i++;
        }
    }
}, function () {
    if (!isRated) {
        $('.ratingForm label').css('backgroundImage', "url('../img/star_grey.png')");
    }
});


function getLocalStorage(qty) {
    if (typeof(window.localStorage) != 'undefined') {
        portions = window.localStorage.getItem(qty);
    } else {
        throw "window.localStorage, not defined";
    }
    return portions;
}

function setLocalStorage(key, value) {
    if (typeof(window.localStorage) != 'undefined') {
        window.localStorage.setItem(key, value);
    }
    else {
        throw "window.localStorage, not defined";
    }
}

