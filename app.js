const createSemesterButton = document.getElementById("createthingbttn");
const SemesterHolder = document.getElementById("semester-holder");
const semesterNumDisplay = document.getElementById("semester-display");
const gpaDisplay = document.getElementById("gpa-display");

let numSemesters = 0;

function createSemester() {
    console.log("I've been called");

    const semester = document.createElement('div');
    semester.className = "semester";

    const SemesterTitle = document.createElement('p');
    SemesterTitle.textContent = `Semester ${++numSemesters}`;
    semester.appendChild(SemesterTitle);

    // Add "Add Course" Button
    const addCourseButton = document.createElement('button');
    addCourseButton.textContent = 'Add Course';
    addCourseButton.className = 'add-course-button';
    semester.appendChild(addCourseButton);

    // Add "Delete Semester" Button
    const deleteSemesterButton = document.createElement('button');
    deleteSemesterButton.textContent = 'Delete Semester';
    deleteSemesterButton.className = 'delete-semester-button';
    semester.appendChild(deleteSemesterButton);

    // Attach event listeners for the buttons
    addCourseButton.addEventListener('click', () => AddCourse(semester));
    deleteSemesterButton.addEventListener('click', () => {
        SemesterHolder.removeChild(semester);
        numSemesters--;
        CalculateGPA(); // Recalculate GPA after removing a semester
    });

    // Add two initial courses
    AddCourse(semester);
    AddCourse(semester);
    AddCourse(semester);
    AddCourse(semester); 

    SemesterHolder.appendChild(semester);
}

function AddCourse(currentSem) {
    // Create the main div that will hold all the course elements
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';

    // Create and set up the text input for the course name
    const courseNameLabel = document.createElement('label');
    courseNameLabel.setAttribute('for', 'course-name');
    courseNameLabel.textContent = 'Course Name: ';
    courseDiv.appendChild(courseNameLabel);

    const courseNameInput = document.createElement('input');
    courseNameInput.type = 'text';
    courseNameInput.className = 'course-name-input';
    courseDiv.appendChild(courseNameInput);

    // Create and set up the number input for course credits
    const creditsLabel = document.createElement('label');
    creditsLabel.setAttribute('for', 'course-credits');
    creditsLabel.textContent = 'Credits: ';
    courseDiv.appendChild(creditsLabel);

    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.className = 'course-credits-input';
    creditsInput.min = '1';
    creditsInput.max = '6'; // Assuming a range of 1-6 credits per course
    courseDiv.appendChild(creditsInput);

    // Create and set up the label for the grade picker
    const gradeLabel = document.createElement('label');
    gradeLabel.setAttribute('for', 'Grade-picker');
    gradeLabel.textContent = 'Grade: ';
    courseDiv.appendChild(gradeLabel);

    // Create and set up the select dropdown for grades
    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'Grade-picker';

    const grades = ['-', 'A', 'B', 'C', 'D', 'F'];
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    });
    courseDiv.appendChild(gradeSelect);
    const deleteCourseBttn = document.createElement("button"); 
    deleteCourseBttn.className = "delete-course-bttn"
    deleteCourseBttn.textContent = "Delete"

    deleteCourseBttn.addEventListener("click", () => {
        currentSem.removeChild(courseDiv)
        CalculateGPA()
    })
    courseDiv.appendChild(deleteCourseBttn)
    // Append the entire courseDiv to the current semester container
    currentSem.appendChild(courseDiv);
}

function updateTotalCredits(numCredits){
    semesterNumDisplay.textContent = `Credits: ${numCredits}`;
}



function CalculateGPA() {
    let totalCredits = 0;
    let totalPoints = 0;

    const semesters = document.querySelectorAll('.semester');

    semesters.forEach(semester => {
        const courses = semester.querySelectorAll('.course');
        courses.forEach(course => {
            const creditsInput = course.querySelector('.course-credits-input');
            const gradeSelect = course.querySelector('.Grade-picker');

            const credits = parseInt(creditsInput.value) || 0;
            const grade = gradeSelect.value;

            // Skip if no credits or grade is selected
            if (credits > 0 && grade !== '-') {
                totalCredits += credits;
                totalPoints += credits * getGradePoints(grade);
            }
        });
    });

    updateTotalCredits(totalCredits)
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.00;

    gpaDisplay.textContent = `GPA: ${gpa}`;
}

// Helper function to convert letter grades to grade points
function getGradePoints(grade) {
    switch (grade) {
        case 'A':
            return 4.0;
        case 'B':
            return 3.0;
        case 'C':
            return 2.0;
        case 'D':
            return 1.0;
        case 'F':
            return 0.0;
        default:
            return 0.0;
    }
}

// Add the event listener for button click
createSemesterButton.addEventListener("click", createSemester);

// Add an event listener to calculate GPA when anything changes in the container
SemesterHolder.addEventListener("input", CalculateGPA);
createSemester()