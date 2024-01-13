// Function to generate the timetable based on user input
function generateTimetable() {
    // Get form input values
    const classroom = document.getElementById('classroomSelect').value;
    const learningDays = Array.from(document.getElementById('learningDays').selectedOptions).map(option => option.value);

    // Extract subjects and teacher data from the form
    const subjectsData = Array.from(document.querySelectorAll('#subjectLessons .subject-row')).map(row => {
        const teacher = row.querySelector('.teacher').value;
        const numSubjects = parseInt(row.querySelector('.numSubjects').value);
        const subjectData = Array.from(row.querySelectorAll('.subject-data-row')).map(dataRow => ({
            subject: dataRow.querySelector('.subject').value,
            lessonsPerWeek: parseInt(dataRow.querySelector('.lessonsPerWeek').value)
        }));
        return { teacher, numSubjects, subjectData };
    });

    // Generate timetable
    const timetable = generateTimetableData(learningDays, subjectsData);

    // Save timetable to local storage
    localStorage.setItem(classroom, JSON.stringify(timetable));

    // Display timetable on the webpage
    displayTimetable(timetable, classroom);
}

// Function to generate timetable data based on input
function generateTimetableData(learningDays, subjectsData) {
    // ... (unchanged)

    return timetable;
}

// Function to display the generated timetable on the webpage

// Function to display the generated timetable on the webpage
function displayTimetable(timetable, classroom) {
    const timetableElement = document.getElementById(classroom);
    timetableElement.innerHTML = ''; // Clear existing timetable content

    for (const day in timetable) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `<h3>${day}</h3>`;

        for (const teacher in timetable[day]) {
            const teacherElement = document.createElement('div');
            teacherElement.className = 'teacher';
            teacherElement.innerHTML = `<p>${teacher}</p>`;

            for (const [timeSlot, lessons] of Object.entries(timetable[day][teacher])) {
                const lessonsElement = document.createElement('p');
                lessonsElement.className = 'lesson';
                lessonsElement.textContent = `${timeSlot}: ${lessons.join(', ')}`;
                teacherElement.appendChild(lessonsElement);
            }

            dayElement.appendChild(teacherElement);
        }

        timetableElement.appendChild(dayElement);
    }

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Timetable';
    deleteButton.className = 'button-delete'; // Apply the delete button styling
    deleteButton.onclick = () => deleteTimetable(classroom);
    timetableElement.appendChild(deleteButton);
}
