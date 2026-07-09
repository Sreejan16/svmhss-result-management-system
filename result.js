import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
// =====================================
// SVMHSS Student Result Portal
// =====================================

// Load all saved results
let exams = [];

async function loadResultsFromFirebase() {

    const querySnapshot = await getDocs(collection(db, "results"));

    querySnapshot.forEach((doc) => {

        exams.push(doc.data());

    });

}

loadResultsFromFirebase();

const viewResultBtn = document.getElementById("viewResultBtn");

if (viewResultBtn) {

viewResultBtn.addEventListener("click", async function () {

    if (exams.length === 0) {

        await loadResultsFromFirebase();

    }

    const registerNumber =
    document.getElementById("viewRegister").value.trim();

        const registerNumber =
        document.getElementById("viewRegister").value.trim();

        const student = exams.find(function (exam) {

            return exam.registerNumber === registerNumber;

        });

        const marksheet =
        document.getElementById("marksheet");

        if (!student) {

            marksheet.innerHTML =
            "<h3 style='color:red;text-align:center;'>Result Not Found</h3>";

            return;

        }

        marksheet.innerHTML = `

<div style="text-align:center; margin-bottom:20px;">

<img
src="images/logo.png"
alt="School Logo"
style="width:90px; height:90px; margin-bottom:10px;">

<h1 style="margin:0;">
SRI VENKATESHWARA MATRICULATION HIGHER SECONDARY SCHOOL
</h1>

<h2 style="margin-top:8px;">
SVMHSS MOCK EXAMINATION RESULT
</h2>

</div>

<hr>

<table border="1" width="100%" cellspacing="0" cellpadding="10">

<tr>
<th>Name</th>
<td>${student.studentName}</td>

<th>Register No</th>
<td>${student.registerNumber}</td>
</tr>

<tr>
<th>Class</th>
<td>${student.studentClass}</td>

<th>Section</th>
<td>${student.studentSection}</td>
</tr>

<tr>
<th>Exam</th>
<td>${student.examName}</td>

<th>Date</th>
<td>${new Date(student.examDate).toLocaleDateString(
'en-IN',
{
day:'2-digit',
month:'long',
year:'numeric'
}
)}</td>
</tr>

</table>

<br>

<h3>Subject Marks</h3>

<table border="1" width="100%" cellspacing="0" cellpadding="10">

<tr>

<th>Subject</th>

<th>Marks Obtained</th>

<th>Maximum Marks</th>

</tr>

<tr>

<td>${student.subject}</td>

<td>${student.marks}</td>

<td>${student.maxMarks}</td>

</tr>

</table>

<br>

<table border="1" width="100%" cellspacing="0" cellpadding="10">

<tr>

<th>Total</th>

<td>${student.marks}/${student.maxMarks}</td>

</tr>

<tr>

<th>Percentage</th>

<td>${student.percentage}%</td>

</tr>

<tr>

<th>Result</th>

<td>

<b style="color:${
student.result === "Pass"
? "green"
: "red"
};">

${student.result}

</b>

</td>

</tr>

</table>

<br><br>

<div style="display:flex;justify-content:space-between;">

<b>Class Teacher</b>

<b>Principal</b>

</div>

`;

    });

}

// Print Result

const printBtn = document.getElementById("printBtn");

if (printBtn) {

    printBtn.addEventListener("click", function () {

        window.print();

    });

}