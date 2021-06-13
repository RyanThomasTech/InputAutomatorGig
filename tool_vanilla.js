const popupBox = document.createElement('div');
const body = document.body;
popupBox.id = 'popupContainer';
popupBox.innerHTML = `
    <form> 
        <input type="text" id="myNumber1" value="">
        <input type="text" id="myNumber2" value="">
        <p id="myNumberSum">&nbsp;</p>
        <p id="msgOut">&nbsp;</p>
        <button id="gmAddNumsBtn" type="button">Add the two numbers</button>  
        <button id="gmCloseDlgBtn" type="button">Close popup</button>         
        <button id="extractSNBtn" type="button">Extract Serial</button>       
    </form>
`
body.appendChild(popupBox);

const btnCloseDialog = document.getElementById('gmCloseDlgBtn');
const btnAddNums = document.getElementById('gmAddNumsBtn');
const btnExtractSN = document.getElementById('extractSNbtn');
const msgOut = document.getElementById('msgOut');

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