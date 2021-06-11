// ==UserScript==
// @name        Salesforce macros form
// @match       *://*.stackoverflow.com/*
// @match       *Salesforce*
// @include     http://stackoverflow.com/*
// @require     https://code.jquery.com/jquery-1.12.4.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Use jQuery to add the form in a "popup" dialog.
$("body").append ( '                                                          \
    <div id="gmPopupContainer">                                               \
    <form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" --> \
        <input type="text" id="myNumber1" value="">                           \
        <input type="text" id="myNumber2" value="">                           \
                                                                              \
        <p id="myNumberSum">&nbsp;</p>                                        \
        <p id="msgOut">&nbsp;</p>                                             \
        <button id="gmAddNumsBtn" type="button">Add the two numbers</button>  \
        <button id="gmCloseDlgBtn" type="button">Close popup</button>         \
        <button id="extractSNBtn" type="button">Extract Serial</button>       \
    </form>                                                                   \
    </div>                                                                    \
' );


//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var A   = $("#myNumber1").val ();
    var B   = $("#myNumber2").val ();
    var C   = parseInt(A, 10) + parseInt(B, 10);

    $("#myNumberSum").text ("The sum is: " + C);
} );

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );

$("#extractSNBtn").click ( function () {
    let regex = new RegExp('(?:serials? numb?e?r?s?|SNs?).*:\\s?(\\w{7})\\s', 'i');
    let text = document.getElementById("cas15").value;

    document.getElementById("00N3600000AZNxJ").value = text.match(regex)[1];
    $("msgOut").text ("SN: " + text.match(regex)[1]);  
} );



//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        bottom:                 20%;                            \
        right:                  10%;                            \
        padding:                2em;                            \
        background:             powderblue;                     \
        border:                 3px double black;               \
        border-radius:          1ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );