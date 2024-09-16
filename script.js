function convertDate() {
    const year = parseInt(document.getElementById('ethiopianYear').value);
    const month = parseInt(document.getElementById('ethiopianMonth').value);
    const day = parseInt(document.getElementById('ethiopianDay').value);

    if (!year || !month || !day) {
        alert("Please enter a valid Ethiopian date.");
        return;
    }

    const gregorianDate = ethiopianToGregorian(year, month, day);
    const utcDate = gregorianDate.toISOString().split('T')[0]; // Convert to UTC and format
    document.getElementById('result').innerText = `Converted UTC Date: ${utcDate}`;
    addToHistory(`${year}/${month}/${day}`, utcDate);
}

function ethiopianToGregorian(ethYear, ethMonth, ethDay) {
    let gregorianYear = ethYear + 7; // Base offset
    if (ethMonth > 4 || (ethMonth === 4 && ethDay > 10)) {
        gregorianYear++;
    }

    let dayOfYear = (ethMonth - 1) * 30 + ethDay;
    if (ethMonth > 12) {
        dayOfYear += 5; // Add Pagumē days
    }

    const gregorianDate = new Date(gregorianYear, 8, 11); // Start from Ethiopian New Year
    gregorianDate.setDate(gregorianDate.getDate() + dayOfYear - 1); // Adjust to the correct day

    // Adjust for the one-day discrepancy
    gregorianDate.setDate(gregorianDate.getDate() - 1); // Subtract one day

    return gregorianDate;
}

function addToHistory(ethiopianDate, utcDate) {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML += `<p>${ethiopianDate} → ${utcDate}</p>`;
}
