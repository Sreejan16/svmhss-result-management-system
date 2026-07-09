// =====================================
// SVMHSS RESULT MANAGEMENT SYSTEM
// Version 3.0
// =====================================

// Load saved data
let exams = JSON.parse(localStorage.getItem("svmhssExams")) || [];

// Table
const tableBody = document.getElementById("resultsBody");

// Edit Mode
let editIndex = -1;


// =====================================
// Load Results
// =====================================

function loadExams() {

    if (!tableBody) return;

    tableBody.innerHTML = "";

    exams.forEach(function(student, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${student.registerNumber}</td>

            <td>${student.studentName}</td>

            <td>${student.total}</td>

            <td>${student.percentage}%</td>

            <td>${student.result}</td>

            <td>

                <button onclick="editExam(${index})">
                Edit
                </button>

                <button onclick="deleteExam(${index})">
                Delete
                </button>

            </td>

        </tr>

        `;

    });


    // Dashboard Cards

    const totalStudents =
    document.getElementById("totalStudents");

    const totalExams =
    document.getElementById("totalExams");

    const resultsStored =
    document.getElementById("resultsStored");

    const latestExam =
    document.getElementById("latestExam");


    if(totalStudents)
    totalStudents.textContent = exams.length;

    if(totalExams)
    totalExams.textContent = exams.length;

    if(resultsStored)
    resultsStored.textContent = exams.length;

    if(latestExam){

        latestExam.textContent =
        exams.length > 0
        ? exams[exams.length-1].examName
        : "Not Available";

    }

}

loadExams();


// =====================================
// Save Result
// =====================================

const saveResultBtn =
document.getElementById("saveResultBtn");

if(saveResultBtn){

saveResultBtn.addEventListener("click",function(e){

e.preventDefault();

const examName =
document.getElementById("examName").value.trim();

const examDate =
document.getElementById("examDate").value;

const subject =
document.getElementById("subject").value.trim();

const maxMarks =
Number(document.getElementById("maxMarks").value);

const studentName =
document.getElementById("studentName").value.trim();

const registerNumber =
document.getElementById("registerNumber").value.trim();

const studentClass =
document.getElementById("studentClass").value.trim();

const studentSection =
document.getElementById("studentSection").value.trim();

const marks =
Number(document.getElementById("marks").value);


// Validation

if(

examName==="" ||

examDate==="" ||

subject==="" ||

studentName==="" ||

registerNumber==="" ||

studentClass==="" ||

studentSection==="" ||

isNaN(marks)

){

alert("Please fill all fields.");

return;

}

if(marks<0 || marks>maxMarks){

alert("Marks should be between 0 and "+maxMarks);

return;

}


const percentage =
((marks/maxMarks)*100).toFixed(2);

const result =
marks >= maxMarks*0.40
? "Pass"
: "Fail";


const resultData={

examName,
examDate,
subject,
maxMarks,

studentName,
registerNumber,
studentClass,
studentSection,

marks,
total:marks,
percentage,
result

};


if(editIndex==-1){

exams.push(resultData);

}

else{

exams[editIndex]=resultData;

editIndex=-1;

}


localStorage.setItem(

"svmhssExams",

JSON.stringify(exams)

);

loadExams();

document.getElementById("resultForm").reset();

alert("Result Saved Successfully.");

});

}
// =====================================
// PART 2
// Edit, Delete, Search
// =====================================


// =====================================
// Edit Result
// =====================================

function editExam(index){

    const student = exams[index];

    document.getElementById("examName").value =
    student.examName;

    document.getElementById("examDate").value =
    student.examDate;

    document.getElementById("subject").value =
    student.subject;

    document.getElementById("maxMarks").value =
    student.maxMarks;

    document.getElementById("studentName").value =
    student.studentName;

    document.getElementById("registerNumber").value =
    student.registerNumber;

    document.getElementById("studentClass").value =
    student.studentClass;

    document.getElementById("studentSection").value =
    student.studentSection;

    document.getElementById("marks").value =
    student.marks;


    editIndex = index;


    alert("Edit Mode Enabled. Update the details and save.");

}


// =====================================
// Delete Result
// =====================================

function deleteExam(index){

    let confirmDelete =
    confirm("Are you sure you want to delete this result?");


    if(confirmDelete){

        exams.splice(index,1);


        localStorage.setItem(
            "svmhssExams",
            JSON.stringify(exams)
        );


        loadExams();


        alert("Result Deleted Successfully.");

    }

}



// =====================================
// Search Result
// =====================================

const searchBox =
document.getElementById("searchBox");


if(searchBox){

searchBox.addEventListener("keyup",function(){


    const searchValue =
    searchBox.value.toLowerCase();


    const rows =
    document.querySelectorAll("#resultsBody tr");


    rows.forEach(function(row){


        const rowText =
        row.textContent.toLowerCase();


        if(rowText.includes(searchValue)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }


    });


});

}

// =====================================
// PART 3
// Logout, Export, Import
// =====================================


// Logout

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",function(){

    let confirmLogout =
    confirm("Are you sure you want to logout?");

    if(confirmLogout){

        localStorage.removeItem("adminLoggedIn");

        alert("Logged out successfully.");

        window.location.href="login.html";

    }

});

}



// Export Backup

const backupBtn =
document.getElementById("backupBtn");


if(backupBtn){

backupBtn.addEventListener("click",function(){


    const data =
    JSON.stringify(exams,null,2);


    const file =
    new Blob(
        [data],
        {type:"application/json"}
    );


    const link =
    document.createElement("a");


    link.href =
    URL.createObjectURL(file);


    link.download =
    "SVMHSS_Result_Backup.json";


    link.click();


    alert("Backup Exported Successfully.");

});

}



// Import Backup

const restoreBtn =
document.getElementById("restoreBtn");

const backupFile =
document.getElementById("backupFile");


if(restoreBtn){

restoreBtn.addEventListener("click",function(){

    backupFile.click();

});

}



if(backupFile){

backupFile.addEventListener("change",function(e){


    const file =
    e.target.files[0];


    if(!file) return;


    const reader =
    new FileReader();


    reader.onload=function(){


        try{


            exams =
            JSON.parse(reader.result);


            localStorage.setItem(
            "svmhssExams",
            JSON.stringify(exams)
            );


            loadExams();


            alert("Backup Restored Successfully.");


        }

        catch{

            alert("Invalid Backup File.");

        }


    };


    reader.readAsText(file);


});

}