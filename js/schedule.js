// Loads data/schedule.json and renders the schedule table
// To update events: edit data/schedule.json — no HTML changes needed.

const TYPE_LABELS = {
  meeting:   { label: 'Club Meeting',  css: 'badge-meeting'   },
  starparty: { label: 'Star Party',    css: 'badge-starparty' },
  virtual:   { label: 'Virtual',       css: 'badge-virtual'   },
  outreach:  { label: 'Outreach',      css: 'badge-outreach'  }
};

function badge(type) {
  const t = TYPE_LABELS[type] || { label: type, css: 'badge-meeting' };
  return `<span class="badge ${t.css}">${t.label}</span>`;
}

function renderEvent(ev) {
  const mapLink = ev.map
    ? `<a href="${ev.map}">Directions &amp; map →</a>`
    : '';
  const addrLine = ev.address
    ? `<span>${ev.address}</span>`
    : '';
  return `
    <tr>
      <td class="sched-date-cell">${ev.date}</td>
      <td style="padding-top:1rem;">${badge(ev.type)}</td>
      <td>
        <p class="sched-time">${ev.time}</p>
        <p class="sched-event">${ev.title}</p>
        <p class="sched-info">${ev.details}</p>
      </td>
      <td>
        <div class="sched-loc">
          <strong>${ev.location}</strong>
          ${addrLine}
          ${mapLink ? `<span>${mapLink}</span>` : ''}
        </div>
      </td>
    </tr>`;
}

function renderMonth(month) {
  const rows = month.events.map(renderEvent).join('');
  return `
    <div class="sched-month">${month.name}</div>
    <div style="overflow-x:auto;">
      <table class="sched-table">
        <thead>
          <tr>
            <th style="width:60px;">Date</th>
            <th style="width:140px;">Type</th>
            <th>Event Details</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

async function loadSchedule() {
  const container = document.getElementById('schedule-container');
  if (!container) return;

  try {
    const res = await fetch('data/schedule.json');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();

    const html = data.months.map(renderMonth).join('');
    container.innerHTML = html;

    const updated = document.getElementById('schedule-updated');
    if (updated && data.updated) {
      updated.textContent = 'Last updated: ' + data.updated;
    }
  } catch (err) {
    container.innerHTML = `
      <div class="info-box" style="border-color:rgba(204,68,68,.4);background:rgba(204,68,68,.05);">
        <strong>Could not load schedule.</strong>
        Check back soon or email
        <a href="mailto:hvabod@groups.io">hvabod@groups.io</a> for the latest events.
      </div>`;
  }
}

loadSchedule();
