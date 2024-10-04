const sectionNames = [
    "Nhập môn", "Mảng bám và cao răng", "Sinh bệnh học bệnh nha chu", 
    "Tiến triển VN sang VNC", "Vi khuẩn", "Đáp ứng viêm miễn dịch", 
    "Đáp ứng ký chủ", "Yếu tố nguy cơ BNC", "Phân loại tình trạng BNC", 
    "Khám MNC, dịch tễ học, chỉ số LS", "Viêm nướu", "VNC", 
    "Bệnh toàn thân và BNC", "ko biet nua"
];

let counts = new Array(sectionNames.length).fill(0);
let addedQuestions = [];
let totalQuestions = 0;

// Create pie chart
let pieChart;

const ctx = document.getElementById('pie-chart').getContext('2d');
function createPieChart() {
    const filteredCounts = counts.filter(count => count > 0);
    const filteredLabels = sectionNames.filter((_, i) => counts[i] > 0);

    if (pieChart) {
        pieChart.destroy(); // Destroy previous chart instance
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: filteredLabels,
            datasets: [{
                data: filteredCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 255, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(0, 255, 255, 0.6)',
                    'rgba(255, 0, 255, 0.6)',
                    'rgba(128, 128, 128, 0.6)',
                    'rgba(128, 0, 128, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                ],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Section Counts',
                }
            }
        }
    });
}

// Update leaderboard display
function updateLeaderboard() {
    const leaderboardDisplay = document.getElementById('leaderboard-display');
    leaderboardDisplay.innerHTML = '';
    
    const sortedSections = sectionNames
        .map((name, index) => ({ name, count: counts[index] }))
        .sort((a, b) => b.count - a.count);

    sortedSections.forEach((section, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${section.name}: ${section.count}`;
        leaderboardDisplay.appendChild(div);
    });
}

// Update added questions display
function updateAddedQuestionsDisplay() {
    const addedQuestionsDisplay = document.getElementById('added-questions-display');
    addedQuestionsDisplay.innerHTML = '';

    addedQuestions.forEach((question, index) => {
        const div = document.createElement('div');
        div.textContent = `Question ${index + 1}: ${question}`;
        addedQuestionsDisplay.appendChild(div);
    });
}

// Increment count
function incrementCount(index) {
    const isHard = confirm("Is this a hard question?");
    addedQuestions.push(sectionNames[index]+(isHard ? " (hard)" : ""));
    counts[index]++;
    totalQuestions++;

    createPieChart();
    updateLeaderboard();
    updateAddedQuestionsDisplay();
}

// Decrement count
function decrementCount(index) {
    if (counts[index] > 0) {
        counts[index]--;
        totalQuestions--;
    }

    createPieChart();
    updateLeaderboard();
    updateAddedQuestionsDisplay();
}

// Reset counts
document.getElementById('reset-button').addEventListener('click', () => {
    const chartName = prompt("Enter a name for the new pie chart:");
    
    if (chartName) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const pieFilename = `${chartName}_${timestamp}.png`;
        // Save pie chart image here (implement saving logic)

        // Reset counts and questions
        counts.fill(0);
        addedQuestions = [];
        totalQuestions = 0;

        createPieChart();
        updateLeaderboard();
        updateAddedQuestionsDisplay();
    }
});

// Populate sections dynamically
sectionNames.forEach((section, index) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.innerHTML = `
        <span>${section}</span>
        <button onclick="decrementCount(${index})">-</button>
        <button onclick="incrementCount(${index})">+</button>
    `;
    document.getElementById('sections').appendChild(sectionDiv);
});

// Initial chart creation
createPieChart();
updateLeaderboard();
