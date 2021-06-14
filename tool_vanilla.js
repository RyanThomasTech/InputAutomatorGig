const popupBox = document.createElement('div');
const body = document.body;
popupBox.id = 'popupContainer';
popupBox.innerHTML = `
    <form> 
        <p id="msgOut">&nbsp;</p>
        <button id="btnEditCase" type="button">Put NCR Ticket in Edit mode</button>  
        <button id="btnGuessTLA" type="button">Guess NCR TLA from Desc</button>  
        <button id="btnGuessNCRComponent" type="button">Guess NCR Component Product</button>  
        <button id="btnGuessNCRComponentSerial" type="button">Guess NCR Component Serial Number</button>  
        <button id="btnSetCaseReasonFM" type="button">Set Case Reason </button> 
        <button id="btnSetCustExpToMinor" type="button">Set Customer Experience Priority to Minor</button> 
        <button id="btnSetAreaToAdminRMAWork" type="button">Set Area to Administrative RMA Work</button>
        <button id="btnInformationForRMADept" type="button">Set Sub-area to Information for RMA Department</button>
        <button id="btnSaveTicket" type="button">Save the ticket</button>
        <button id="btnCreateAndSetRMA" type="button">Create RMA and Set RMA Address based on Description</button>
        <button id="btnSaveRMA" type="button">Save the RMA</button>
        <button id="btnAddNewRMALine" type="button">Add new RMA Line Item</button>
        <button id="btnSetShippedToCAARFG" type="button">Set WareHouse Part Shipped to CA-AR-FG</button>
        <button id="btnSetShippedToGLAR" type="button">Set WareHouse Part Shipped to GL-AR</button>
        <button id="btnSetShippedToPHAR" type="button">Set WareHouse Part Shipped to PH-AR</button>
        <button id="btnSaveRMALine" type="button">Save the RMA Line Item</button>
        <button id="btnSubmitNCRRMA" type="button">Submit the NCR RMA</button>
        <button id="btnSetCaseStatusRMAIssued" type="button">Set Case Status to RMA Issued</button>
        <button id="btnNCRRMAEmail" type="button">Write NCR RMA Email</button>

        <button id="gmCloseDlgBtn" type="button">Close popup</button>         
        <button id="extractSNBtn" type="button">Extract Serial</button>       
    </form>
`
body.appendChild(popupBox);

/***********************************
 * BUTTONS AND FIELDS DEFINED HERE *
 ***********************************/

const btnCloseDialog = document.getElementById('gmCloseDlgBtn');
const btnAddNums = document.getElementById('gmAddNumsBtn');
const btnExtractSN = document.getElementById('extractSNbtn');
const msgOut = document.getElementById('msgOut');
const btnEditCase = document.getElementById('btnEditCase');
const btnGuessTLA = document.getElementById('btnGuessTLA');
const btnNCRRMAEmail = document.getElementById('btnNCRRMAEmail');
const btnSetCaseStatusRMAIssued = document.getElementById('btnSetCaseStatusRMAIssued');
const btnSubmitNCRRMA = document.getElementById('btnSubmitNCRRMA');
const btnSaveRMALine = document.getElementById('btnSaveRMALine');
const btnSetShippedToPHAR = document.getElementById('btnSetShippedToPHAR');
const btnSetShippedToGLAR = document.getElementById('btnSetShippedToGLAR');
const btnSetShippedToCAARFG = document.getElementById('btnSetShippedToCAARFG');
const btnAddNewRMALine = document.getElementById('btnAddNewRMALine');
const btnSaveRMA = document.getElementById('btnSaveRMA');
const btnCreateAndSetRMA = document.getElementById('btnCreateAndSetRMA');
const btnSaveTicket = document.getElementById('btnSaveTicket');
const btnInformationForRMADept = document.getElementById('btnInformationForRMADept');
const btnSetAreaToAdminRMAWork = document.getElementById('btnSetAreaToAdminRMAWork');
const btnSetCustExpToMinor = document.getElementById('btnSetCustExpToMinor');
const btnSetCaseReasonFM = document.getElementById('btnSetCaseReasonFM');
const btnGuessNCRComponentSerial = document.getElementById('btnGuessNCRComponentSerial');
const btnGuessNCRComponent = document.getElementById('btnGuessNCRComponent');

/***
 * EVENTLISTENERS
 */

btnAddNums.addEventListener('click', function() {
    const firstVal = document.getElementById('myNumber1').value;
    const secondVal = document.getElementById('myNumber2').value;
    let result = firstVal + secondVal;
    msgOut.innerHTML = result;
});

btnExtractSN.addEventListener('click', function() {
    let regex = new RegExp('(?:serials? numb?e?r?s?|SNs?).*:\\s?(\\w{7})\\s', 'i');
    let text = document.getElementById("cas15").value;

    document.getElementById("00N3600000AZNxJ").value = text.match(regex)[1];
    $("msgOut").text ("SN: " + text.match(regex)[1]); 
})

btnEditCase.addEventListener('click', function() {

});

btnGuessTLA.addEventListener('click', function() {

});

btnGuessNCRComponent.addEventListener('click', function() {
    
});

btnGuessNCRComponentSerial.addEventListener('click', function() {
    
});

btnSetCaseReasonFM.addEventListener('click', function() {
    
});

btnSetCustExpToMinor.addEventListener('click', function() {
    
});

btnSetAreaToAdminRMAWork.addEventListener('click', function() {
    
});

btnInformationForRMADept.addEventListener('click', function() {
    
});

btnSaveTicket.addEventListener('click', function() {
    
});

btnCreateAndSetRMA.addEventListener('click', function() {
    
});

btnSaveRMA.addEventListener('click', function() {
    
});

btnAddNewRMALine.addEventListener('click', function() {
    
});

btnSetShippedToCAARFG.addEventListener('click', function() {
    
});

btnSetShippedToGLAR.addEventListener('click', function() {
    
});

btnSetShippedToPHAR.addEventListener('click', function() {
    
});

btnSaveRMALine.addEventListener('click', function() {
    
});

btnSubmitNCRRMA.addEventListener('click', function() {
    
});

btnSetCaseStatusRMAIssued.addEventListener('click', function() {
    
});

btnNCRRMAEmail.addEventListener('click', function() {
    
});