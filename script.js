var conTok = "90931863|-31949301414694798|90963064"
var dbname = 'Student'
var rel = 'Student-Rel'

function getStudent()
{
    
    var roll = document.getElementById('rollNo').value;
    var json_ = {
        'rollNo' : roll
    }
    jQuery.ajaxSetup({async:false})

    var req = createGET_BY_KEYRequest(conTok,dbname,rel,JSON.stringify(json_))
    var jsonObj = executeCommandAtGivenBaseUrl(req, baseUrl, irlPartUrl) 
    jQuery.ajaxSetup({async:true})
    if(jsonObj['status'] == 200)
    {
        var data = JSON.parse(jsonObj['data'])['record']
        
        document.getElementById('fullName').value = data['fullName']
        document.getElementById('class').value = data['class']
        document.getElementById('birthDate').value = data['birthDate']
        document.getElementById('address').value = data['address'] 
        document.getElementById('enrollmentDate').value = data['enrollmentDate']

        document.getElementById('rollNo').disabled = true
        document.getElementById('saveB').disabled = true
        document.getElementById('updateB').disabled = false

       
    }
    document.getElementById('fullName').focus()
    
    
    return JSON.parse(jsonObj['data'])['rec_no']

}

function areAllFieldsValid() {
    var isValid = true;

    // Validate Roll No
    var rollNo = document.getElementById('rollNo').value;
    if (rollNo.trim() === '') {
        isValid = false;
        document.getElementById('rollNo').innerText = 'Roll No is required';
    } else {
        document.getElementById('rollNo').innerText = '';
    }

    // Validate Full Name
    var fullName = document.getElementById('fullName').value;
    if (fullName.trim() === '') {
        isValid = false;
        document.getElementById('fullName').innerText = 'Full Name is required';
    } else {
        document.getElementById('fullName').innerText = '';
    }

    // Validate Class
    var studentClass = document.getElementById('class').value;
    if (studentClass.trim() === '') {
        isValid = false;
        document.getElementById('class').innerText = 'Class is required';
    } else {
        document.getElementById('class').innerText = '';
    }

    // Validate Birth Date
    var birthDate = document.getElementById('birthDate').value;
    if (birthDate.trim() === '') {
        isValid = false;
        document.getElementById('birthDate').innerText = 'Birth Date is required';
    } else {
        document.getElementById('birthDate').innerText = '';
    }

    // Validate Address
    var address = document.getElementById('address').value;
    if (address.trim() === '') {
        isValid = false;
        document.getElementById('address').innerText = 'Address is required';
    } else {
        document.getElementById('address').innerText = '';
    }

    // Validate Enrollment Date
    var enrollmentDate = document.getElementById('enrollmentDate').value;
    if (enrollmentDate.trim() === '') {
        isValid = false;
        document.getElementById('enrollmentDate').innerText = 'Enrollment Date is required';
    } else {
        document.getElementById('enrollmentDate').innerText = '';
    }

    return isValid;
}



function getFormValuesAsJson() {
    var form = document.getElementById('enrollmentForm');
    var formData = new FormData(form);

    var formDataObject = {};
    formData.forEach(function(value, key){
        formDataObject[key] = value;
    });

    return formDataObject;
}

function saveData() {

    if(areAllFieldsValid() != true)
        {
            alert("Fill all..")
            return
        }
    
    
    jQuery.ajaxSetup({async:false})
    var jsonData = getFormValuesAsJson();
    
    var req = createPUTRequest(conTok,JSON.stringify(jsonData),dbname,rel)
    console.log(req)
    var jsonObj = executeCommandAtGivenBaseUrl(req, baseUrl, imlPartUrl) 
    jQuery.ajaxSetup({async:true})
    console.log('Saving data:', jsonData);

    resetForm()
}


function updateData() {



    document.getElementById('rollNo').disabled = false
jQuery.ajaxSetup({async:false})
var jsonData = getFormValuesAsJson();

var req = createUPDATERecordRequest(conTok,JSON.stringify(jsonData),baseUrl,rel,getStudent())
console.log(req)
var jsonObj = executeCommandAtGivenBaseUrl(req, baseUrl, imlPartUrl) 
jQuery.ajaxSetup({async:true})
console.log('Updating data:', jsonData);

resetForm()
  
}

function resetForm() {
    document.getElementById('enrollmentForm').reset();
}

window.onload = resetForm