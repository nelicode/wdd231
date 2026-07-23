const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, category: "WDD", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, category: "WDD", completed: false },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 2, category: "WDD", completed: false },
    { code: "CSE 110", name: "Programming with Functions", credits: 2, category: "CSE", completed: true },
    { code: "CSE 111", name: "Programming with Classes", credits: 2, category: "CSE", completed: true },
    { code: "CSE 210", name: "Programming with Data Structures", credits: 2, category: "CSE", completed: false }
];

const courseContainer = document.getElementById('course-container');
const totalCreditsElement = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayCourses(coursesToShow) {
    if (!courseContainer) return;
    
    courseContainer.innerHTML = '';
    
    if (coursesToShow.length === 0) {
        courseContainer.innerHTML = '<p>No courses in this category.</p>';
        updateTotalCredits(coursesToShow);
        return;
    }
    
    coursesToShow.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card${course.completed ? ' completed' : ''}`;
        
        card.innerHTML = `
            <div class="course-code">${course.code}</div>
            <div class="course-name">${course.name}</div>
            <div class="course-credits">${course.credits} credits</div>
            <div class="course-category">${course.category}</div>
        `;
        
        courseContainer.appendChild(card);
    });
    
    updateTotalCredits(coursesToShow);
}

function updateTotalCredits(coursesToShow) {
    if (!totalCreditsElement) return;
    
    const total = coursesToShow.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `The total credits for course listed above is ${total}`;
}

function filterCourses(category) {
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        const btnId = btn.id;
        if ((category === 'All' && btnId === 'filter-all') ||
            (category === 'CSE' && btnId === 'filter-cse') ||
            (category === 'WDD' && btnId === 'filter-wdd')) {
            btn.classList.add('active');
        }
    });
    
    let filteredCourses;
    if (category === 'All') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.category === category);
    }
    
    displayCourses(filteredCourses);
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.textContent.trim();
        if (filter === 'All') {
            filterCourses('All');
        } else if (filter === 'CSE') {
            filterCourses('CSE');
        } else if (filter === 'WDD') {
            filterCourses('WDD');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    filterCourses('All');
});