const LS_NAME = 'studentsRegistration';

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LS_NAME)) ?? [];
}
const setLocalStorage = (studentsList) => {
    localStorage.setItem(LS_NAME, JSON.stringify(studentsList));
}

const registerStudent = () => {
    let enrollment = document.getElementById('enrollment').value ? document.getElementById('enrollment').value : '';
    let name = document.getElementById('studentName').value ? document.getElementById('studentName').value : '';
    let firstGrade = document.getElementById('firstGrade').value ? parseFloat(document.getElementById('firstGrade').value) : 0.0;
    let secondGrade = document.getElementById('secondGrade').value ? parseFloat(document.getElementById('secondGrade').value) : 0.0;
    let thirdGrade = document.getElementById('thirdGrade').value ? parseFloat(document.getElementById('thirdGrade').value) : 0.0;
    let form = document.getElementById('studentRegistrationForm');
    let schoolSituation = '';
    let arithmeticAverage = parseFloat((firstGrade + secondGrade + thirdGrade) / 3);

    if (arithmeticAverage < 4.0) {
        schoolSituation = 'Disapproved';
    } else if (arithmeticAverage >= 4.0 && arithmeticAverage <= 7.0) {
        schoolSituation = 'Recuperation';
    } else if (arithmeticAverage > 7.0) {
        schoolSituation = 'Approved';
    }

    let studentsList = getLocalStorage();
    let student = studentsList.some(stud => stud['enrollment'] === enrollment);

    if (!student) {
        studentsList.push({
            'enrollment': enrollment,
            'studentName': name,
            'firstGrade': firstGrade,
            'secondGrade': secondGrade,
            'thirdGrade': thirdGrade,
            'arithmeticAverage': arithmeticAverage,
            'schoolSituation': schoolSituation
        });
        setLocalStorage(studentsList);
        Swal.fire({
            icon: 'success',
            title: 'Successfully registered student.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((e) => {
            form.reset();
            window.location.reload(true);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'School enrollment already registered.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }

}

const deleteStudent = (enrollment) => {
    let studentToDelete;
    let studentsList = getLocalStorage();

    studentsList.map(student => {
        if (student['enrollment'] === enrollment) {
            studentToDelete = JSON.stringify(studentsList.indexOf(student));
        }
    });
    studentsList.splice(studentToDelete, 1);
    setLocalStorage(studentsList);
    window.location.reload(true);
}

window.onload = () => {
    let htmlStudentsList;
    let students = JSON.parse(window.localStorage.getItem(LS_NAME));
    let studentsListDiv = document.getElementById('studentsList');
    let badgeColor = 'bg-light';

    students.map(student => {
        if (student['schoolSituation'] === 'Approved') {
            badgeColor = 'bg-success';
        } else if (student['schoolSituation'] === 'Disapproved') {
            badgeColor = 'bg-danger';
        } else if (student['schoolSituation'] === 'Recuperation') {
            badgeColor = 'bg-warning';
        }

        htmlStudentsList = `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${student['enrollment']} - ${student['studentName']}</div>
                    <p>
                        <small>Grade 1º: ${student['firstGrade']} | </small>
                        <small>Grade 2º: ${student['secondGrade']} | </small>
                        <small>Grade 3º: ${student['thirdGrade']}</small>
                    </p>
                    Arithmetic average: ${student['arithmeticAverage'].toFixed(2)}
                </div>
                <div class="d-flex align-self-end">
                    <span class="badge ${badgeColor} rounded-pill">${student['schoolSituation']}</span>
                </div>
                <div class="d-flex align-self-start">
                    <button type="button" class="btn btn-light" onclick="deleteStudent('${student['enrollment']}')"><i class="bi bi-trash"></i></button>
                </div>
            </li>
        `;
        studentsListDiv.innerHTML += htmlStudentsList;
    })

};

