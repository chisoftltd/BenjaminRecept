/**
 * Created by Chisoft on 2016-02-24.
 */
/*jslint browser: true*/
/*global $, jQuery, alert, updateDragger*/
/*global getLocalStorage: false, console: false, $: false */

var myPoint = 0;
//var isRated = false;
var savedValue;
var text;
var yeastPortion;
var milkPortion;
var waterPortion;
var saltPortion;
var butterPortion;
var vanillaPortion;
var nutmegPortion;
var flourPortion;
var euButterPortion;
var eggPortion;
var euButterPortion2;
var guestNumber;
var sugarPortion;

// window load event
window.onload = displayResults();

// Declare two getLocalStorage to store or save votes and average values.
$('#votes').text(getLocalStorage("key2"));
$('#average').text(getLocalStorage("key3"));

// method to handle the slider rule of varying number of guest and amount of ingredients portion
function rangeSlider(id, onDrag) {
    "use strict";

    var range = document.getElementById(id),
        dragger = range.children[0],
        draggerWidth = 10, // width of your slider
        down = false,
        rangeWidth, rangeLeft;

    dragger.style.width = draggerWidth + 'px';
    dragger.style.left = -draggerWidth + 'px';
    dragger.style.marginLeft = (draggerWidth / 2) + 'px';

    range.addEventListener("mousedown", function (e) {
        rangeWidth = this.offsetWidth;
        rangeLeft = this.offsetLeft;
        down = true;
        updateSlider(e);
        return false;
    });

    // MouseMove event listener
    document.addEventListener("mousemove", function (e) {
        updateSlider(e);
    });

    // MouseUp event listener
    document.addEventListener("mouseup", function () {
        down = false;
    });

    //Slider updateSlider method
    function updateSlider(e) {
        if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
            dragger.style.left = e.pageX - rangeLeft - draggerWidth + 'px';
            if (typeof onDrag === "function") {
                onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 10));
            }
        }
    }

}


// Method to update ingredient portion as slider moves


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
function displayResults() {
    $('#votes').html('<img src="../img/loader.gif">');
    $('#average').html('<img src="../img/loader.gif">');
    $.ajax({
        method: "GET",
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

    document.getElementById("yeast").innerHTML = getLocalStorage('yeast');
    document.getElementById("egg").innerHTML = getLocalStorage('egg');
    document.getElementById("water").innerHTML = getLocalStorage('water');
    document.getElementById("salt").innerHTML = getLocalStorage('salt');
    document.getElementById("milk").innerHTML = getLocalStorage('milk');
    document.getElementById("butter").innerHTML = getLocalStorage('butter');
    document.getElementById("vanilla").innerHTML = getLocalStorage('vanilla');
    document.getElementById("nutmeg").innerHTML = getLocalStorage('nutmeg');
    document.getElementById("flour").innerHTML = getLocalStorage('flour');
    document.getElementById("euButter").innerHTML = getLocalStorage('euButter');
    document.getElementById("euButter2").innerHTML = getLocalStorage('euButter2');
    document.getElementById("euButter3").innerHTML = getLocalStorage('euButter2');
    document.getElementById('faber').innerHTML = getLocalStorage('faber');
}

// rate
$('.ratingForm input').click(function () {
    //if (!isRated) {
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
                displayResults();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
   //}
    setTimeout(function () {
        location.reload()
    }, 1000);
});

$(".ratingForm label").hover(function () {
   // if (!isRated) {
        var value = ($('input[name=rating]:hover', '.ratingForm').val());
        var i = 0;
        while (i <= value) {
            $('label[for=star' + i + ']').css('backgroundImage', "url('img/star_pink.png')");
            i++;
        }
   // }
}, function () {
   // if (!isRated) {
        $(".ratingForm label").css('backgroundImage', "url('img/star_grey.png')");
   // }
});

function getLocalStorage(qty) {
    if (typeof(window.localStorage) != 'undefined') {
        savedValue = window.localStorage.getItem(qty);
    } else {
        throw "window.localStorage, not defined";
    }
    return savedValue;
}

function setLocalStorage(key, value) {
    if (typeof(window.localStorage) != 'undefined') {
        window.localStorage.setItem(key, value);
    }
    else {
        throw "window.localStorage, not defined";
    }
}
function outputUpdate(value) {
    document.querySelector('#fader').value = value;
    setLocalStorage('fader', value);
    "use strict";
    text = ' guest';
    if (value === 0) {
        value = 1;
        text += "";
    } else {
        text += "s";
    }

    guestNumber = value + text;
    setLocalStorage('volume', guestNumber);
    document.getElementById('volume').innerHTML = guestNumber;
    yeastPortion = 0.25 * value;
    eggPortion = 1 * value;
    waterPortion = 0.5 * value;
    saltPortion = 1 * value;
    milkPortion = 0.5 * value;
    butterPortion = 2 * value;
    vanillaPortion = 1.0 * value;
    nutmegPortion = 0.125 * value;
    flourPortion = 1 * value;
    euButterPortion = 12 * value;
    euButterPortion2 = 6 * value;
    sugarPortion = 2.5 * value;

    setLocalStorage('yeast', yeastPortion);
    setLocalStorage('egg', eggPortion);
    setLocalStorage('water', waterPortion);
    setLocalStorage('salt', saltPortion);
    setLocalStorage('milk', milkPortion);
    setLocalStorage('butter', butterPortion);
    setLocalStorage('vanilla', vanillaPortion);
    setLocalStorage('nutmeg', nutmegPortion);
    setLocalStorage('flour', flourPortion);
    setLocalStorage('euButter', euButterPortion);
    setLocalStorage('enButter2', euButterPortion2);
    setLocalStorage('sugar', sugarPortion);

    document.getElementById("yeast").innerHTML = yeastPortion;
    document.getElementById("egg").innerHTML = eggPortion;
    document.getElementById("water").innerHTML = waterPortion;
    document.getElementById("salt").innerHTML = saltPortion;
    document.getElementById("milk").innerHTML = milkPortion;
    document.getElementById("butter").innerHTML = butterPortion;
    document.getElementById("vanilla").innerHTML = vanillaPortion;
    document.getElementById("nutmeg").innerHTML = nutmegPortion;
    document.getElementById("flour").innerHTML = flourPortion;
    document.getElementById("euButter").innerHTML = euButterPortion;
    document.getElementById("sugar").innerHTML = sugarPortion;

    document.getElementById("yeast2").innerHTML = yeastPortion;
    document.getElementById("egg2").innerHTML = eggPortion;
    document.getElementById("water2").innerHTML = waterPortion;
    document.getElementById("salt2").innerHTML = saltPortion;
    document.getElementById("milk2").innerHTML = milkPortion;
    document.getElementById("butter2").innerHTML = butterPortion;
    document.getElementById("vanilla2").innerHTML = vanillaPortion;
    document.getElementById("nutmeg2").innerHTML = nutmegPortion;
    document.getElementById("flour2").innerHTML = flourPortion;
    document.getElementById("euButter").innerHTML = euButterPortion;
    document.getElementById("sugar2").innerHTML = sugarPortion;

    document.getElementById("euButter2").innerHTML = euButterPortion2;
    document.getElementById("euButter3").innerHTML = euButterPortion2;
}
