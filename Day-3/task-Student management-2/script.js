'use strict';

/* ============================================================
   STUDENT MANAGEMENT SYSTEM — basic version
   Plain functions + a single students array. No classes,
   no layers — everything lives in this one file.
   ============================================================ */

const STORAGE_KEY = 'basic_sms_students';
const PAGE_SIZE = 5;

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let students = loadStudents();
let currentPage = 1;
let editingId = null;

// ---------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------
const form = document.getElementById('studentForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const courseInput = document.getElementById('course');
const gradeInput = document.getElementById('grade');
const studentIdInput = document.getElementById('studentId');

const searchInput = document.getElementById('searchInput');
const filterCourse = document.getElementById('filterCourse');
const sortSelect = document.getElementById('sortSelect');
const resetBtn = document.getElementById('resetBtn');

const tableBody = document.getElementById('tableBody');
const emptyMsg = document.getElementById('emptyMsg');
const pagination = document.getElementById('pagination');
const toast = document.getElementById('toast');

// ---------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------
function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedStudents();
  } catch (err) {
    console.error('Could not read saved students, starting fresh.', err);
    return seedStudents();
  }
}

function saveStudents() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.error('Could not save students:', err);
    showToast('Could not save changes (storage full or blocked).', true);
  }
}

function seedStudents() {
  return [
    { id: crypto.randomUUID(), name: 'Riya Sharma', email: 'riya@example.com', age: 20, course: 'Computer Science', grade: 'A' },
    { id: crypto.randomUUID(), name: 'Aman Verma', email: 'aman@example.com', age: 22, course: 'Mathematics', grade: 'B+' },
    { id: crypto.randomUUID(), name: 'Priya Nair', email: 'priya@example.com', age: 19, course: 'Biology', grade: 'A+' },
    { id: crypto.randomUUID(), name: 'Karan Mehta', email: 'karan@example.com', age: 21, course: 'Commerce', grade: 'B' },
    { id: crypto.randomUUID(), name: 'Sneha Iyer', email: 'sneha@example.com', age: 23, course: 'Physics', grade: '' },
    { id: crypto.randomUUID(), name: 'Farhan Khan', email: 'farhan@example.com', age: 20, course: 'Arts', grade: 'C' },
  ];
}

// ---------------------------------------------------------------
// Validation
// ---------------------------------------------------------------
function validateForm(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  } else {
    // duplicate email check (ignore the record currently being edited)
    const duplicate = students.find(
      (s) => s.email.toLowerCase() === data.email.trim().toLowerCase() && s.id !== editingId
    );
    if (duplicate) errors.email = 'This email is already registered.';
  }

  if (data.age === '' || data.age === null) {
    errors.age = 'Age is required.';
  } else if (Number.isNaN(Number(data.age)) || !Number.isInteger(Number(data.age))) {
    errors.age = 'Age must be a whole number.';
  } else if (data.age < 3 || data.age > 100) {
    errors.age = 'Age must be between 3 and 100.';
  }

  if (!data.course) {
    errors.course = 'Please select a course.';
  }

  return errors;
}

function showFieldErrors(errors) {
  clearFieldErrors();
  Object.entries(errors).forEach(([field, message]) => {
    const el = document.getElementById(`err-${field}`);
    if (el) el.textContent = message;
  });
}

function clearFieldErrors() {
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
}

// ---------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------
function addStudent(data) {
  students.push({ id: crypto.randomUUID(), ...data });
  saveStudents();
}

function updateStudent(id, data) {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;
  students[index] = { ...students[index], ...data };
  saveStudents();
  return true;
}

function deleteStudent(id) {
  students = students.filter((s) => s.id !== id);
  saveStudents();
}

// ---------------------------------------------------------------
// Form handling
// ---------------------------------------------------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value === '' ? '' : Number(ageInput.value),
    course: courseInput.value,
    grade: gradeInput.value,
  };

  const errors = validateForm(data);
  if (Object.keys(errors).length > 0) {
    showFieldErrors(errors);
    return;
  }
  clearFieldErrors();

  const cleanData = { ...data, name: data.name.trim(), email: data.email.trim().toLowerCase() };

  if (editingId) {
    updateStudent(editingId, cleanData);
    showToast('Student updated successfully.');
  } else {
    addStudent(cleanData);
    showToast('Student added successfully.');
  }

  resetForm();
  currentPage = editingId ? currentPage : 1; // jump to page 1 to see a newly added student
  render();
});

cancelEditBtn.addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  editingId = null;
  studentIdInput.value = '';
  formTitle.textContent = 'Add New Student';
  submitBtn.textContent = 'Add Student';
  cancelEditBtn.hidden = true;
  clearFieldErrors();
}

function startEdit(id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  editingId = id;
  studentIdInput.value = id;
  nameInput.value = student.name;
  emailInput.value = student.email;
  ageInput.value = student.age;
  courseInput.value = student.course;
  gradeInput.value = student.grade;

  formTitle.textContent = 'Edit Student';
  submitBtn.textContent = 'Update Student';
  cancelEditBtn.hidden = false;
  clearFieldErrors();
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---------------------------------------------------------------
// Search + Filter + Sort
// ---------------------------------------------------------------
function getFilteredStudents() {
  const term = searchInput.value.trim().toLowerCase();
  const course = filterCourse.value;
  const [sortField, sortDir] = sortSelect.value.split('-');

  let result = students.filter((s) => {
    const matchesSearch = !term ||
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term);
    const matchesCourse = !course || s.course === course;
    return matchesSearch && matchesCourse;
  });

  result.sort((a, b) => {
    let cmp;
    if (sortField === 'age') {
      cmp = a.age - b.age;
    } else {
      cmp = a.name.localeCompare(b.name);
    }
    return sortDir === 'desc' ? -cmp : cmp;
  });

  return result;
}

let debounceTimer = null;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentPage = 1;
    render();
  }, 250);
});

filterCourse.addEventListener('change', () => {
  currentPage = 1;
  render();
});

sortSelect.addEventListener('change', render);

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterCourse.value = '';
  sortSelect.value = 'name-asc';
  currentPage = 1;
  render();
});

// ---------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------
function paginate(list) {
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  // Clamp current page into a valid range (handles filters shrinking the list)
  currentPage = Math.min(Math.max(1, currentPage), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = list.slice(start, start + PAGE_SIZE);

  return { pageItems, totalPages };
}

function renderPagination(totalPages) {
  pagination.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.textContent = '‹ Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    currentPage--;
    render();
  });
  pagination.appendChild(prevBtn);

  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (p === currentPage ? ' active' : '');
    btn.textContent = p;
    btn.addEventListener('click', () => {
      currentPage = p;
      render();
    });
    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.textContent = 'Next ›';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    currentPage++;
    render();
  });
  pagination.appendChild(nextBtn);
}

// ---------------------------------------------------------------
// Table rendering
// ---------------------------------------------------------------
function gradeClass(grade) {
  return grade ? '' : 'none';
}

function renderRow(student) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${escapeHtml(student.name)}</td>
    <td>${escapeHtml(student.email)}</td>
    <td>${student.age}</td>
    <td>${escapeHtml(student.course)}</td>
    <td><span class="grade-badge ${gradeClass(student.grade)}">${student.grade || 'N/A'}</span></td>
    <td>
      <button class="btn btn-edit btn-sm" data-action="edit" data-id="${student.id}">Edit</button>
      <button class="btn btn-danger btn-sm" data-action="delete" data-id="${student.id}">Delete</button>
    </td>
  `;
  return tr;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

tableBody.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (action === 'edit') {
    startEdit(id);
  } else if (action === 'delete') {
    if (confirm('Delete this student record? This cannot be undone.')) {
      deleteStudent(id);
      showToast('Student deleted.');
      render();
    }
  }
});

// ---------------------------------------------------------------
// Toast
// ---------------------------------------------------------------
let toastTimer = null;
function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---------------------------------------------------------------
// Main render
// ---------------------------------------------------------------
function render() {
  const filtered = getFilteredStudents();
  const { pageItems, totalPages } = paginate(filtered);

  tableBody.innerHTML = '';
  if (pageItems.length === 0) {
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;
    pageItems.forEach((student) => tableBody.appendChild(renderRow(student)));
  }

  renderPagination(totalPages);
}

// ---------------------------------------------------------------
// Init
// ---------------------------------------------------------------
render();