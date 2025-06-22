// app.js

const STORAGE_KEY = 'classReadingLog';

// 책 목록 불러오기
function loadBooks() {
  const booksJSON = localStorage.getItem(STORAGE_KEY);
  return booksJSON ? JSON.parse(booksJSON) : [];
}

// 책 목록 저장하기
function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// 책 목록 렌더링
function renderBookList() {
  const books = loadBooks();
  const list = document.getElementById('book-list');
  list.innerHTML = '';
  
  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `[${book.studentId}] ${book.studentName} - "${book.title}" by ${book.author} (${book.readDate})\n감상평: ${book.review}`;
    
    // 삭제 버튼
    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제';
    delBtn.onclick = () => {
      books.splice(index, 1);
      saveBooks(books);
      renderBookList();
    };
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

// 책 추가 함수
function addBook() {
  const studentId = document.getElementById('student-id').value.trim();
  const studentName = document.getElementById('student-name').value.trim();
  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const readDate = document.getElementById('read-date').value;
  const review = document.getElementById('review').value.trim();

  if (!studentId || !studentName || !title || !author || !readDate) {
    alert('학번, 이름, 책 제목, 저자, 읽은 날짜를 모두 입력하세요.');
    return;
  }

  const books = loadBooks();
  books.push({ studentId, studentName, title, author, readDate, review });
  saveBooks(books);
  renderBookList();

  // 입력창 초기화
  document.getElementById('student-id').value = '';
  document.getElementById('student-name').value = '';
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('read-date').value = '';
  document.getElementById('review').value = '';
}

// 페이지 로드 시 책 목록 렌더링
window.onload = renderBookList;
