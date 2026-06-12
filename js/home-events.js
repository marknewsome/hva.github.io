// Renders the first 4 upcoming events on the home page from SCHEDULE_DATA.
// To update: edit data/schedule-data.js

function linkify(text) {
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>');
  text = text.replace(/(?<!href=")(https?:\/\/[^\s<"]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>');
  return text;
}

const HOME_TYPE_COLORS = {
  meeting:   'text-gold',
  starparty: 'text-cyan',
  virtual:   'text-cyan',
  outreach:  'text-green'
};

const HOME_TYPE_BADGE = {
  meeting:   'badge-meeting',
  starparty: 'badge-starparty',
  virtual:   'badge-virtual',
  outreach:  'badge-outreach'
};

const HOME_TYPE_LABEL = {
  meeting:   'Club Meeting',
  starparty: 'Star Party',
  virtual:   'Virtual',
  outreach:  'Outreach'
};

function renderHomeCard(ev, monthName) {
  const color = HOME_TYPE_COLORS[ev.type] || 'text-cyan';
  const badge = HOME_TYPE_BADGE[ev.type]  || 'badge-meeting';
  const label = HOME_TYPE_LABEL[ev.type]  || ev.type;
  const eyebrow = ev.date !== 'TBA'
    ? `${monthName.split(' ')[0]} ${ev.date}`
    : `${monthName.split(' ')[0]} — Date TBA`;
  const locationLine = ev.map
    ? `<a href="${ev.map}">${ev.location}</a>`
    : ev.location;

  return `
    <div class="card">
      <p class="card-eyebrow ${color}">${eyebrow}</p>
      <div class="mb-1"><span class="badge ${badge}">${label}</span></div>
      <p class="card-title">${ev.title}</p>
      <p class="card-body">${linkify(ev.details)}</p>
      <div class="card-footer">
        <strong>${ev.time}</strong> &nbsp;&middot;&nbsp; ${locationLine}
      </div>
    </div>`;
}

function loadHomeEvents() {
  const container = document.getElementById('upcoming-events');
  if (!container || typeof SCHEDULE_DATA === 'undefined') return;

  const cards = [];
  for (const month of SCHEDULE_DATA.months) {
    for (const ev of month.events) {
      cards.push(renderHomeCard(ev, month.name));
      if (cards.length === 4) break;
    }
    if (cards.length === 4) break;
  }

  container.innerHTML = cards.join('');
}

loadHomeEvents();
