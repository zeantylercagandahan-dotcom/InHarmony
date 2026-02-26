document.addEventListener("DOMContentLoaded", () => {

const quotes = [
    {
        text: "Therapy is a gift. It is a chance to finally be heard, understood, and supported.",
        author: "Bessel van der Kolk"
    },
    {
        text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
        author: "Julian Seifter"
    },
    {
        text: "Vulnerability sounds like truth and feels like courage. Truth and courage aren't always comfortable, but they're never weakness.",
        author: "Brené Brown"
    },
    {
        text: "Mental Health problems don't define who you are. They are something you experience. You walk in the rain and you feel the rain, but, importantly, you are not the rain.",
        author: "Matt Haig"
    },
    {
        text: "Once you replace negative thoughts with positive ones, you'll start having positive results.",
        author: "Willie Nelson"
    },
    {
        text: "Even in the darkest moments, light exists if you have faith to see it.",
        author: "Dean Koontz"
    }
];

const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];

const quoteContainer = document.getElementById("randomTextContainer");

if (quoteContainer) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteContainer.innerHTML = `
        <div class="quote-container">
            <p class="quote-text">"${randomQuote.text}"</p>
            <p class="quote-author">- ${randomQuote.author}</p>
        </div>`;
}

const policyModal = document.getElementById("policyModal");
const policyBtn = document.getElementById("policyBtn");
const closePolicyBtn = document.getElementById("closePolicyBtn");

policyBtn.addEventListener("click", () => {
    policyModal.style.display = "block";
});

closePolicyBtn.addEventListener("click", () => {
    policyModal.style.display = "none";
});

const termsModal = document.getElementById("termsModal");
const termsBtn = document.getElementById("termsBtn");
const closeTermsBtn = document.getElementById("closeTermsBtn");

termsBtn.addEventListener("click", () => {
    termsModal.style.display = "block";
});

closeTermsBtn.addEventListener("click", () => {
    termsModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === policyModal) {
        policyModal.style.display = "none";
    }
    if (event.target === termsModal) {
        termsModal.style.display = "none";
    }
});

});

document.addEventListener('DOMContentLoaded', () => {
  const modal2 = document.getElementById('modal2');
  const expandBtn2 = document.getElementById('expandBtn2');
  const closeBtn2 = document.querySelector('.close-btn2');

  if (!modal2 || !expandBtn2 || !closeBtn2) return;

  expandBtn2.addEventListener('click', () => {
      modal2.style.display = 'block';
  });

  closeBtn2.addEventListener('click', () => {
      modal2.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target === modal2) {
          modal2.style.display = 'none';
      }
  });
});





'schedules'

const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('month-year');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const eventDateInput = document.getElementById('event-date');
const eventTitleInput = document.getElementById('event-title');
const addBtn = document.getElementById('add-event');
const deleteBtn = document.getElementById('delete-event');
const therapyDetails = document.getElementById('therapy-details');
const draftList = document.getElementById('draft-list');

let currentDate = new Date();
let selectedDate = null;
let events = {}; 

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function renderCalendar(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  monthYear.innerText = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  daysContainer.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();


  for (let i = 0; i < firstDay; i++) daysContainer.innerHTML += `<div></div>`;

  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = i;

    const dayKey = formatDate(new Date(year, month, i));

    if (events[dayKey]) dayDiv.style.backgroundColor = '#90EE90';
    if (selectedDate === dayKey) dayDiv.classList.add('selected');
    if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      dayDiv.classList.add('today');
    }

    dayDiv.addEventListener('click', () => {
      selectedDate = dayKey;
      eventDateInput.value = dayKey;
      therapyDetails.textContent = events[dayKey]?.map(e => e.title).join(', ') || 'No sessions';
      renderCalendar(currentDate);
    });

    daysContainer.appendChild(dayDiv);
  }
}

addBtn.addEventListener('click', () => {
  if (!selectedDate || !eventTitleInput.value) return alert('Select a day and enter a title');
  if (!events[selectedDate]) events[selectedDate] = [];
  events[selectedDate].push({ title: eventTitleInput.value });
  therapyDetails.textContent = events[selectedDate].map(e => e.title).join(', ');
  eventTitleInput.value = '';
  renderCalendar(currentDate);
  updateDrafts();
});

deleteBtn.addEventListener('click', () => {
  if (!selectedDate || !events[selectedDate]) return alert('No event to delete');
  events[selectedDate].pop();
  if (events[selectedDate].length === 0) delete events[selectedDate];
  therapyDetails.textContent = events[selectedDate]?.map(e => e.title).join(', ') || 'No sessions';
  renderCalendar(currentDate);
  updateDrafts();
});

function updateDrafts() {
  draftList.innerHTML = '';
  for (let date in events) {
    events[date].forEach(e => {
      const li = document.createElement('li');
      li.textContent = `${date}: ${e.title}`;
      draftList.appendChild(li);
    });
  }
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
