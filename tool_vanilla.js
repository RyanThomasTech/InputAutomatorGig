const macroBoxBox = document.createElement('div');
const body = document.body;
macroBoxBox.id = 'macroBoxContainer';
macroBoxBox.className = 'macroBoxContainer';
macroBoxBox.innerHTML = `
    <button id="btnMinMax" class="macroBoxUI">&ndash;</button>
    <div id="statusBar" class="flexContainer macroBoxContent">
        <p>Status: </p>
        <p id="msgOut">&nbsp;</p>
    </div>
    <div id="NCRButtons" class="macroBoxContent"> 
        <button id="btnEditCase" type="button">Put NCR Ticket in Edit mode</button> 
        <br /> 
        <button id="btnGuessTLA" type="button">Guess NCR TLA from Desc</button>  
        <button id="btnGuessNCRComponent" type="button">Guess NCR Component Product</button>  
        <button id="btnGuessNCRComponentSerial" type="button">Guess NCR Component Serial Number</button>  
        <button id="btnSetCaseReasonFM" type="button">Set Case Reason to Field Malfunction</button> 
        <button id="btnSetCustExpToMinor" type="button">Set Customer Experience Priority to Minor</button> 
        <button id="btnSetAreaToAdminRMAWork" type="button">Set Area to Administrative RMA Work</button>
        <button id="btnInformationForRMADept" type="button">Set Sub-area to Information for RMA Department</button>
        <br />
        <button id="btnSaveTicket" type="button">Save the ticket</button>
        <div class="directions">Is it in warranty?</div>
        <button id="btnCreateAndSetRMA" type="button">Create RMA and Set RMA Address based on Description</button>
        <br />
        <button id="btnSaveRMA" type="button">Save the RMA</button>
        <br />
        <button id="btnAddNewRMALine" type="button">Add new RMA Line Item</button>
        <div id="divWareHouseParts" class="flexContainer">
            <p>Set Warehouse Part Shipped To: </p>
            <button id="btnSetShippedToCAARFG" type="button">CA-AR-FG</button>
            <p> -OR- </p>
            <button id="btnSetShippedToGLAR" type="button">GL-AR</button>
            <p> -OR- </p>
            <button id="btnSetShippedToPHAR" type="button">PH-AR</button>
        </div>
        <button id="btnSaveRMALine" type="button">Save the RMA Line Item</button>
        <div class="directions">Return to the RMA Header</div>
        <button id="btnSubmitNCRRMA" type="button">Submit the NCR RMA</button>
        <div class="directions">Return to the Case</div>
        <button id="btnSetCaseStatusRMAIssued" type="button">Set Case Status to RMA Issued</button>
        <div id="divNCREmail" class="flexContainer">
            <button id="btnNCRRMAEmail" type="button">Write NCR RMA Email</button>
            <p>using RMA number </p>
            <input type="text" id="fieldRMANum" name="fieldRMANum">
            <button id="btnCloseCase" type="button">Close case w/ note issued + PDF sent</button>
        </div>
        <button id="btnNCRRMAOOWEmail" type="button">Write NCR RMA Out-Of-Warranty Email</button>
        <button id="btnCloseCaseOOW" type="button">Close case w/ OOW note</button>
    </form>
`
body.appendChild(macroBoxBox);

/***********************************
 * BUTTONS AND FIELDS DEFINED HERE *
 ***********************************/

const btnCloseDialog = document.getElementById('gmCloseDlgBtn');
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
const btnNCRRMAOOWEmail = document.getElementById('btnNCRRMAOOWEmail');
const btnCloseCase= document.getElementById('btnCloseCase');
const btnCloseCaseOOW = document.getElementById('btnCloseCaseOOW');

const inputRMANum = document.getElementById('fieldRMANum');

const g_UnicomSFDC_RMA_Information_RMA_Type = '00N36000006t9rQ';
const g_UnicomSFDC_RMA_Address_Company_Name = '00N36000006trWL';
const g_UnicomSFDC_RMA_Address_First_Name = '00N36000006treu';
const g_UnicomSFDC_RMA_Address_Last_Name = '00N36000006trf9';
const g_UnicomSFDC_RMA_Address_Address = '00N36000006tsMP';
const g_UnicomSFDC_RMA_Address_Address2 = '00N36000007uNIv';
const g_UnicomSFDC_RMA_Address_Phone = '00N36000006ts0c';
const g_UnicomSFDC_RMA_Address_City = '00N36000006tsMK';
const g_UnicomSFDC_RMA_Address_Zipcode = '00N36000006txUX';
const g_UnicomSFDC_RMA_Address_Country = '00N3600000NykWz';
const g_UnicomSFDC_RMA_Address_StateProvince = '00N3600000NykXJ';
const g_UnicomSFDC_RMA_ShipVia = '00N3600000NxnoD';
const g_UnicomSFDC_RMA_ShipSLA = '00N3600000RUreH';

const regexPONum= new RegExp('(?:^|\\s)PO(?:\\s+)?(?::|#|is|nbr)?\\s+([0-9_\\-]{7})\\s?','i');
const regexTLANum = new RegExp('TLA(?:\\s+)?(?::|#|is|nbr|nbr|nbr)?\\s?(\\w+)');
const regexpartnum = new RegExp('(?:^|\\s)(?:vendor part|vpn|pn|unicom part)(?:\\s+)?(?::|#|is|nbr)?\\s?([a-za-z0-9_\\-]+)\\s?','i');
const regexserialnum = new RegExp('(?:^|\\s)(?:sn|sl|serial number)(?:\\s+)?(?::|#|is|nbr)?\\s?([a-za-z0-9_\\-]+)\\s?', 'i');

/***
 * ON PAGELOAD
 */

window.addEventListener('load', async function () {
    const nextTask = await GM.getValue("nextTask", "none");
    switch (nextTask){
        case "matchAccNumToAddress":
            await GM.deleteValue("nextTask");
            handleMismatchAccNumAndAddress();
            break;
        case "createNewRMA":
            await GM.deleteValue("nextTask");
            createNewRMA();
            break;
        case "populateNewRMA":
            await GM.deleteValue("nextTask");
            populateNewRMAFields();
            break;
        case 'submitRMA':
            await GM.deleteValue('nextTask');
            submitRMA();
            break;
        case 'setRMAIssued':
            await GM.deleteValue('nextTask');
            setRMAIssued();
            break;
        case 'writeRMAEmail':
            await GM.deleteValue('nextTask');
            populateEmailFields();
            break;
        default:
            break;
    }
});

/***
 * UI STUFF
 */

let maximize = true,
    btnMinMax = macroBoxBox.children[0];

function macroBoxMinMax(){
  if (maximize){
    macroBoxBox.className += ' minimize';
    btnMinMax.innerHTML = '+';
    maximize = false;
  } else {
    macroBoxBox.className = macroBoxBox.className.replace(/(^| )minimize($| )/g, "");
    btnMinMax.innerHTML = '&ndash;';
    maximize = true;
  }
}

/*******************
 * MISC. FUNCTIONS *
 ******************/

async function handleMismatchAccNumAndAddress(){
    const accNum = await JSON.parse(GM.getValue("accInfo","0000000000")).accnum;
    const lastDigit = parseInt(accNum[accNum.length - 1],10);
    const accIsNCR = ((accNum.substring(0,3) == 'NCR') ? true : false );
    switch(lastDigit){
        case 1:
            document.getElementById('cas4').value = (accIsNCR ? 'NCR Corporation' : 'Veritas Technologies LLC');
            break;
        case 2:
            document.getElementById('cas4').value = (accIsNCR ? 'NCR ESLC B.V.' : 'Veritas Storage (Ireland) Ltd.');
            break;
        case 3:
            document.getElementById('cas4').value = (accIsNCR ? 'NCR Hong Kong Ltd.' : 'Veritas Corp Hong Kong');
            break;
        default:
            break;
        }
           
   
    await GM.setValue("nextTask", "createNewRMA");
    document.getElementsByName('save')[0].click();
};

async function populateNewRMAFields(){
    const PONum = await GM.getValue("PONum", null);
    await GM.deleteValue("PONum");
    const RMADesc = document.getElementById('00N36000006u06F').value;
    if (RMADesc.indexOf('HONG KONG') != -1){
        setRMAAddressToHongKong();
    } else if (RMADesc.indexOf('MEMPHIS') != -1){
        setRMAAddressToMemphis();
    } else if (RMADesc.indexOf('Holtum-Noordweg 8B')){
       setRMAAddressToHoltum();
    } else {
        alert("No valid NCR Address found. Address not set.");
    }
}

function setRMAAddressToHongKong(){
    document.getElementById(g_UnicomSFDC_RMA_Information_RMA_Type ).value = 'REPAIR_PH';
    document.getElementById(g_UnicomSFDC_RMA_Address_Company_Name ).value = 'NCR Asia Regional Parts Center';
    document.getElementById(g_UnicomSFDC_RMA_Address_First_Name ).value = 'Kenneth';
    document.getElementById(g_UnicomSFDC_RMA_Address_Last_Name ).value = 'Chui';
    document.getElementById(g_UnicomSFDC_RMA_Address_Address ).value = 'Room 501 & 502, 5/F';
    document.getElementById(g_UnicomSFDC_RMA_Address_Address2 ).value = 'Kerry (Tsuen Wan) Warehouse No.3, Shing Yiu Street';
    document.getElementById(g_UnicomSFDC_RMA_Address_Phone ).value = '852-29897721';
    document.getElementById(g_UnicomSFDC_RMA_Address_City ).value = 'Kwai Chung';
    document.getElementById(g_UnicomSFDC_RMA_Address_Zipcode ).value = ' ';
    document.getElementById(g_UnicomSFDC_RMA_Address_Country ).value = 'Hong Kong';
    document.getElementById(g_UnicomSFDC_RMA_Address_StateProvince ).value = '--None--';
    document.getElementById(g_UnicomSFDC_RMA_ShipVia ).value = 'FEDX-I ECONOMY';
    document.getElementById(g_UnicomSFDC_RMA_ShipSLA ).value = 'R&R';
}

function setRMAAddressToMemphis(){
    document.getElementById( g_UnicomSFDC_RMA_Information_RMA_Type ).value = 'REPAIR';
    document.getElementById( g_UnicomSFDC_RMA_Address_Company_Name ).value = 'NCR C/O FedEx Global Supply Chain Services';
    document.getElementById( g_UnicomSFDC_RMA_Address_First_Name   ).value = 'Kelly';
    document.getElementById( g_UnicomSFDC_RMA_Address_Last_Name    ).value = 'Brickell';
    document.getElementById( g_UnicomSFDC_RMA_Address_Address      ).value = '5025 Tuggle Rd';
    document.getElementById( g_UnicomSFDC_RMA_Address_Address2     ).value = '';
    document.getElementById( g_UnicomSFDC_RMA_Address_Phone        ).value = '770-288-1732';
    document.getElementById( g_UnicomSFDC_RMA_Address_City         ).value = 'Memphis';
    document.getElementById( g_UnicomSFDC_RMA_Address_Zipcode      ).value = '38118';
    document.getElementById( g_UnicomSFDC_RMA_Address_Country      ).value = 'United States';
    document.getElementById( g_UnicomSFDC_RMA_Address_StateProvince).value = 'TN';
    document.getElementById( g_UnicomSFDC_RMA_ShipVia              ).value = 'FEDX GROUND';
    document.getElementById( g_UnicomSFDC_RMA_ShipSLA              ).value = 'R&R';
}

function setRMAAddressToHoltum() {
    document.getElementById( g_UnicomSFDC_RMA_Information_RMA_Type ).value = 'REPAIRIRE'
    document.getElementById( g_UnicomSFDC_RMA_Address_Company_Name ).value = 'NCR Dutch Holdings B.V. c/o Mainfreight Logistic Services'
    document.getElementById( g_UnicomSFDC_RMA_Address_First_Name   ).value = 'Pim'
    document.getElementById( g_UnicomSFDC_RMA_Address_Last_Name    ).value = 'Houtvast'
    document.getElementById( g_UnicomSFDC_RMA_Address_Address      ).value = 'Holtum-Noordweg 8B'
    document.getElementById( g_UnicomSFDC_RMA_Address_Address2     ).value = ' '
    document.getElementById( g_UnicomSFDC_RMA_Address_Phone        ).value = '+31207151515'
    document.getElementById( g_UnicomSFDC_RMA_Address_City         ).value = 'Born'
    document.getElementById( g_UnicomSFDC_RMA_Address_Zipcode      ).value = '6121 RE'
    document.getElementById( g_UnicomSFDC_RMA_Address_Country      ).value = 'Netherlands'
    document.getElementById( g_UnicomSFDC_RMA_Address_StateProvince).value = '--None--'
    document.getElementById( g_UnicomSFDC_RMA_ShipVia              ).value = 'FEDX-I ECONOMY'
    document.getElementById( g_UnicomSFDC_RMA_ShipSLA              ).value = 'R&R'
}

function verifyAddressAndAccountNumberMatches(json) {
    const contactInfo = JSON.parse(json);
    const RMADesc = document.getElementById('cas15_ileinner').innerText;
    if (RMADesc.indexOf('HONG KONG') != -1){
        if (contactInfo.accnum == 'NCR0003' || contactInfo.accnum == 'VESFRU03'){
            //nothing required
        } else {
            matchAccDataToAddress(3);
        }
    } else if (RMADesc.indexOf('MEMPHIS') != -1){
        if (contactInfo.accnum == 'NCR0001' || contactInfo.accnum == 'VESFRU01'){
            //nothing required
        } else {
            matchAccDataToAddress(1);
        }
    } else if (RMADesc.indexOf('Holtum-Noordweg 8B')){
        if (contactInfo.accnum == 'NCR0002' || contactInfo.accnum == 'VESFRU02'){
            //nothing required
        } else {
            matchAccDataToAddress(2);
        }
    } else {
        alert('No valid NCR address was found. Could not check NCR account.');
    }
};

async function matchAccDataToAddress(digit){
    //consider using GM_notification for this if users dont get enough warning
    alert('The Account Name / Number is wrong. It should be NCR000' + digit + ' / VESFRU0' + digit + '. Changing it.');
    await GM.setValue('nextTask','matchAccNumToAddress');

    document.getElementsByName('edit')[0].click();
}

async function createNewRMA(){
    const regex = regexPONum;
    const PONum = document.getElementById('cas15_ileinner').innerText.match(regex)[1];
    await GM.setValue('PONum', PONum);
    await GM.setValue('nextTask', 'populateNewRMA');
    document.getElementsByName('new_rma_entry')[0].click();
}

function submitRMA(){
    document.getElementById('00N36000006tAnC').checked = true;
    document.getElementsByName('save')[0].click();
}

function setRMAIssued(){
    document.getElementById('cas7').value = 'RMA Issued';
    document.getElementsByName('save')[0].click();
}

async function populateEmailFields(){
    const json = JSON.parse(await GM.getValue('emailData', JSON.stringify({customerRefNum: 'NOT FOUND',insertedRMANum: 'NOT FOUND', inWarranty: 0})));
    await GM.deleteValue('emailData');
    document.getElementById('p26').value = 'support@unicomengineering.com:Unicom Engineering Support';
    const caseNum = document.getElementById('p3').value;
    const subjLine = "Unicom Support Request " + caseNum + " - NCR " + json.customerRefNum;
    if (json.inWarranty){
        const bodyLine = 'Hi NCR Team,\n\nPlease use ' + json.insertedRMANum + ' for this RMA+\nYou should be receiving a copy of the PDF shortly+\n\nRegards,\nUNICOM Support Staff';
    } else {
        const bodyLine = 'Hi NCR Team,\n\nThe warranty on this serial number expired on XXXXXXXXXXXXXXXXXXXX and it is no longer eligible for an RMA.\n\nRegards,\n';
    }
    document.getElementById('p6').value = subjLine;
    document.getElementById('p7').value = bodyLine;
}

function verifyNCREmailButton(inWarranty){
    if (document.getElementsByName('send_email').length){
        const accNumSS = document.getElementById('00N36000007vIzI_ileinner').innerText.substring(0,3);
        
        if (!(accNumSS == 'VES' || accNumSS == 'NCR')){
            alert('This does not appear to be an NCR ticket.');
        } else {
            getEmailData(inWarranty);
        }
    } else {
        alert('Salesforce is not on the correct page. Please go to the \'Cases\' tab and try again.');
    }
}

async function getEmailData(inWarranty){
    const json = JSON.stringify({   customerRefNum : document.getElementById('00N3600000Ny6Nf_ileinner').innerText,
                                    insertedRMANum : inputRMANum.value,
                                    inWarranty: inWarranty});
    await GM.setValue('emailData', json);
    await GM.setValue('nextTask','writeRMAEmail');
    document.getElementsByName('send_email')[0].click();
}

/*************************
 * BUTTON EVENTLISTENERS *
 ************************/

btnMinMax.addEventListener('click', macroBoxMinMax);

btnEditCase.addEventListener('click', function() {
    document.getElementsByName('edit')[0].click();

});

btnGuessTLA.addEventListener('click', function() {
    const regex = regexTLANum;
    let text = document.getElementById('cas15').value;

    document.getElementById('Asset').value = text.match(regex)[1];

});

btnGuessNCRComponent.addEventListener('click', function() {
    const regex = regexPartNum;
    const text = document.getElementById('cas15').value;

    document.getElementById('CF00N3600000Ny8ka').value = text.match(regex)[1];
    
});

btnGuessNCRComponentSerial.addEventListener('click', function() {
    const regex = regexSerialNum;

    document.getElementById('00N3600000AZNxJ').value = document.getElementById('cas15').value.match(regex)[1];
    
});

btnSetCaseReasonFM.addEventListener('click', function() {
    document.getElementById('cas6').value = 'Field Malfunction';
});

btnSetCustExpToMinor.addEventListener('click', function() {
    document.getElementById('00N3600000OmpIt').value = '*  Minor';
});

btnSetAreaToAdminRMAWork.addEventListener('click', function() {
    document.getElementById('00N3600000Ny6Ne').value = 'Administrative RMA Work'   
});

btnInformationForRMADept.addEventListener('click', function() {
    document.getElementById('00N3600000Ny6Ni').value = 'Information for RMA Dept'
});

btnSaveTicket.addEventListener('click', function() {
    document.getElementsByName('save')[0].click();
});

btnCreateAndSetRMA.addEventListener('click', async function() {
    if (document.getElementsByName('new_rma_entry').length){
        //Utilizing Violentmonkey's special GM.* API's
        const NCRContactName = document.getElementById('cas3_ileinner').innerText;
        const NCRContactPhone = document.getElementById('cas10_ileinner').innerText;
        const NCRContactEmail = document.getElementById('cas9_ileinner').innerText;
        const NCRAccNum = document.getElementById('00N36000007vIzI_ilecell').innerText;
        const NCRContactInfo = JSON.stringify({name: NCRContactName, phone: NCRContactPhone, email: NCRContactEmail, accnum: NCRAccNum});
        await GM.setValue('accInfo', NCRContactInfo);
        verifyAddressAndAccountNumberMatches(NCRContactInfo);

        createNewRMA();
    } else {
        alert('New RMA entry button not found. Please confirm you are on the case page.');
    }
});

btnSaveRMA.addEventListener('click', function() {
    document.getElementsByName('save')[0].click();
});

btnAddNewRMALine.addEventListener('click', function() {
    document.getElementsByName('new_rma_line')[0].click();
});

btnSetShippedToCAARFG.addEventListener('click', function() {
    document.getElementById('00N3600000RUreO').value = 'Canton';
    document.getElementById('00N3600000BPydq').value = 'CA-AR-FG';
});

btnSetShippedToGLAR.addEventListener('click', function() {
    document.getElementById('00N3600000RUreO').value = 'Galway';
    document.getElementById('00N3600000BPydq').value = 'GL-AR';
    
});

btnSetShippedToPHAR.addEventListener('click', function() {
    document.getElementById('00N3600000RUreO').value = 'Manila';
    document.getElementById('00N3600000BPydq').value = 'PH-AR';
    
});

btnSaveRMALine.addEventListener('click', function() {
    document.getElementsByName('save')[0].click();
});

btnSubmitNCRRMA.addEventListener('click', async function() {
    await GM.setValue('nextTask','submitRMA');
    document.getElementsByName('edit')[0].click();   
});

btnSetCaseStatusRMAIssued.addEventListener('click', async function() {
    await GM.setValue('nextTask','setRMAIssued');
    document.getElementsByName('edit')[0].click();   
});

btnNCRRMAEmail.addEventListener('click', function() {
    verifyNCREmailButton(1);
});

btnNCRRMAOOWEmail.addEventListener('click', function() {
    verifyNCREmailButton(0);
});

btnCloseCase.addEventListener('click', function() {
    document.getElementById('cas7').value = 'Closed';
    document.getElementById('cas6').value = 'Field Malfunction';
    document.getElementById('cas16').value = 'RMA issued.  PDF sent from GP.  Closing ticket.';
    document.getElementById('solNote').value = 'RMA issued.  PDF sent from GP.  Closing ticket.';
});

btnCloseCaseOOW.addEventListener('click', function() {
    document.getElementById('cas7').value = 'Closed';
    document.getElementById('cas6').value = 'Field Malfunction';
    document.getElementById('cas16').value = 'Out of warranty.  No RMA.  Closing ticket.';
    document.getElementById('solNote').value = 'Out of warranty.  No RMA.  Closing ticket.';
});

/**
 * CSS STYLES
 */

GM.addStyle(`
    .macroBoxContainer {
        background: powderblue;
        max-width: 500px;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
    }

    .macroBoxContent{
        margin: 0em 0.5em;
    }

    .directions{
        margin: 0.5em;
    }

    #msgOut {
        display: block;
        position: relative;
        height: 1.5em;
        padding: 0em 0.5em;
    }

    button {
        display: inline-block;
        /*border: none;*/
        padding: 3px 6px;
        margin: 2px 0rem;
        text-decoration: none;
        background: #lightgray;
        color: #000;
        font-family: sans-serif;
        font-size: 12px;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out, 
                    transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .flexContainer {
        display: inline-flex;
        flex-flow: row wrap;
        justify-content: flex-start;
    }

    .flexContainer>p{
        margin: 0.5em 0em;
    }

    button:hover,
    button:focus {
        background: #0085c4;
    }

    button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }

    button:active {
        transform: scale(0.99);
    }

    .macroBoxUI {
        background: #76c9d4;
        height: 2em;
        width: 2em;
        font-size: 1em;
        margin: 0;
        padding: 0;
        font-weight: bold;
        border: none;
    }

    .macroBoxContainer.minimize {
        width:2em !important;
        height:2em !important;
        overflow:hidden !important;
        margin-top:0 !important;
        margin-left:0 !important;
        bottom:1em !important;
        left:-1px !important;
    }

    .macroBoxContainer.minimize .macroBoxContent {
        display:none;
        visibility:hidden;
    }
`)

