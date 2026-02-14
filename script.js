const calendar = document.getElementById("calendar");
const monthSelect = document.getElementById("monthSelect");

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// Weekly content rules (0 = Sunday)
const weeklySchedule = {
  1: { text: "Adventure 1 · Content 1", type: "brand" },      // Monday
  2: { text: "Motion TikTok", type: "campaign" },             // Tuesday
  3: { text: "Adventure 1 · Content 1", type: "brand" },      // Wednesday
  4: { text: "TikTok Photo", type: "campaign" },              // Thursday
  5: { text: "Adventure · Travel & Tour", type: "launch" },  // Friday
  6: { text: "—", type: "" },                                 // Saturday
  0: { text: "Content Detail · Photo · TikTok", type: "brand" } // Sunday
};

// Populate month dropdown
months.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = month;
  monthSelect.appendChild(option);
});

monthSelect.value = 0;
renderCalendar(0);

monthSelect.onchange = e => renderCalendar(e.target.value);

function renderCalendar(month) {
  calendar.innerHTML = "";
  const year = 2026;

  // Find which weekday the month starts on
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty cells before Day 1
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "day";
    emptyDiv.style.visibility = "hidden";
    calendar.appendChild(emptyDiv);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const weekday = date.getDay();
    const schedule = weeklySchedule[weekday];

    const div = document.createElement("div");
    div.className = "day";

    div.innerHTML = `
      <div class="day-number">${day}</div>
      <div class="label ${schedule.type}">
        ${schedule.text}
      </div>
    `;

    calendar.appendChild(div);
  }
}
