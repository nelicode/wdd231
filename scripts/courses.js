// ===== COURSE DATA =====
// completed: true = already completed, false = currently taking
const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true, category: 'WDD' },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: false, category: 'WDD' },
    { code: 'WDD 231', name: 'Advanced Web Development', credits: 2, completed: false, category: 'WDD' },
    { code: 'CSE 110', name: 'Programming with Functions', credits: 3, completed: true, category: 'CSE' },
    { code: 'CSE 111', name: 'Programming with Classes', credits: 3, completed: true, category: 'CSE' },
    { code: 'CSE 210', name: 'Programming with Data Structures', credits: 3, completed: true, category: 'CSE' }
];

// ===== DISPLAY COURSES =====
function displayCourses(courseArray) {
    const courseList = document.querySelector('#course-list');
    if (!courseList) return;

    courseList.innerHTML = '';

    if (courseArray.length === 0) {
        courseList.innerHTML = '<p class="no-courses">No courses in this category.</p>';
        updateTotalCredits(courseArray);
        return;
    }

    courseArray.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card${course.completed ? ' completed' : ''}`;

        const statusText = course.completed ? '✅ Completed' : '⏳ In Progress';
        const statusClass = course.completed ? 'done' : 'pending';

        card.innerHTML = `
      <div class="course-info">
        <span class="course-code">${course.code}</span>
        <span class="course-name">${course.name}</span>
      </div>
      <div class="course-right">
        <span class="course-credits">📚 ${course.credits} credits</span>
        <span class="course-status ${statusClass}">${statusText}</span>
      </div>
    `;

        courseList.appendChild(card);
    });

    updateTotalCredits(courseArray);
}

// ===== UPDATE TOTAL CREDITS =====
function updateTotalCredits(courseArray) {
    const totalElement = document.querySelector('#total-credits span');
    if (!totalElement) return;

    const total = courseArray.reduce((sum, course) => sum + course.credits, 0);
    totalElement.textContent = total;
}

// ===== FILTER COURSES =====
function filterCourses(category) {
    // Update active buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

    let filtered = [];

    if (category === 'All') {
        document.querySelector('#all-btn').classList.add('active');
        filtered = courses;
    } else if (category === 'WDD') {
        document.querySelector('#wdd-btn').classList.add('active');
        filtered = courses.filter(course => course.category === 'WDD');
    } else if (category === 'CSE') {
        document.querySelector('#cse-btn').classList.add('active');
        filtered = courses.filter(course => course.category === 'CSE');
    }

    displayCourses(filtered);
}

// ===== BUTTON EVENTS =====
document.addEventListener('DOMContentLoaded', () => {
    const allBtn = document.querySelector('#all-btn');
    const wddBtn = document.querySelector('#wdd-btn');
    const cseBtn = document.querySelector('#cse-btn');

    if (allBtn) allBtn.addEventListener('click', () => filterCourses('All'));
    if (wddBtn) wddBtn.addEventListener('click', () => filterCourses('WDD'));
    if (cseBtn) cseBtn.addEventListener('click', () => filterCourses('CSE'));

    // Initialize: show all courses
    filterCourses('All');
});