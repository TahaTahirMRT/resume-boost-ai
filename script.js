const jobKeywords = {
  frontend: ["HTML", "CSS", "JavaScript", "React", "Git", "Responsive", "Tailwind", "Redux"],
  backend: ["Node", "Express", "API", "Database", "SQL", "Authentication", "MongoDB", "REST"],
  data: ["Python", "SQL", "Excel", "Power BI", "Statistics", "Data Analysis", "Pandas", "Visualization"],
  fullstack: ["HTML", "CSS", "JavaScript", "React", "Node", "Express", "MongoDB", "API"],
  devops: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux", "Git", "Automation", "Jenkins"],
  cybersecurity: ["Network Security", "Firewalls", "Penetration Testing", "Cryptography", "Risk Assessment", "SIEM"],
  mobile: ["Flutter", "React Native", "Android", "iOS", "Firebase", "UI/UX"],
  uiux: ["Figma", "Wireframing", "Prototyping", "User Research", "UX Design", "UI Design"]
};

function analyzeResume() {
  const resumeText = document.getElementById("resumeInput").value;
  const selectedRole = document.getElementById("jobRole").value;
  const resultsDiv = document.getElementById("results");

  if (resumeText.trim() === "") {
    resultsDiv.innerHTML = "<p class='text-red-400'>Please paste your resume first.</p>";
    return;
  }

  const keywords = jobKeywords[selectedRole];
  const resumeLower = resumeText.toLowerCase();

  let foundKeywords = [];
  let missingKeywords = [];

  keywords.forEach(keyword => {
    if (resumeLower.includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Keyword Score (50%)
  const keywordScore = (foundKeywords.length / keywords.length) * 50;

  // Action words detection (20%)
  const actionWords = ["developed", "built", "implemented", "designed", "created"];
  let actionScore = 0;
  actionWords.forEach(word => {
    if (resumeLower.includes(word)) {
      actionScore += 4;
    }
  });
  if (actionScore > 20) actionScore = 20;

  // Length Score (15%)
  const wordCount = resumeText.split(/\s+/).length;
  let lengthScore = (wordCount > 150 && wordCount < 700) ? 15 : 5;

  // Contact Info Score (15%)
  let contactScore = 0;
  if (resumeLower.includes("@")) contactScore += 7;
  if (resumeLower.includes("linkedin")) contactScore += 8;

  const totalScore = Math.round(keywordScore + actionScore + lengthScore + contactScore);

  const headline = generateHeadline(selectedRole);

  resultsDiv.innerHTML = `
    <div class="fade-in">
      <div class="score-circle">${totalScore}%</div>

      <h2 class="text-xl font-bold text-center mb-4">Advanced Resume Analysis</h2>

      <p class="text-green-400">
        ✅ Found Keywords: ${foundKeywords.length ? foundKeywords.join(", ") : "None"}
      </p>

      <p class="text-red-400 mt-2">
        ❌ Missing Keywords: ${missingKeywords.join(", ")}
      </p>

      <p class="mt-4 text-gray-300">
        📄 Word Count: ${wordCount} words
      </p>

      <div class="mt-6">
        <h3 class="font-semibold mb-2">💼 Suggested LinkedIn Headline:</h3>
        <p class="text-blue-400">${headline}</p>
      </div>

      <div class="mt-6">
        <h3 class="font-semibold mb-2">📌 Smart Improvement Tips:</h3>
        <ul class="list-disc ml-6 text-gray-300">
          <li>Add missing technical keywords relevant to the selected job.</li>
          <li>Use measurable achievements with numbers.</li>
          <li>Ensure LinkedIn profile link is included.</li>
          <li>Keep resume between 1–2 pages.</li>
        </ul>
      </div>
    </div>
  `;
}

function generateHeadline(role) {
  const headlines = {
    frontend: "Frontend Developer | React | Modern UI Specialist | Responsive Web Apps",
    backend: "Backend Developer | APIs | Databases | Scalable Systems",
    data: "Data Analyst | Python | SQL | Turning Data into Insights",
    fullstack: "Full Stack Developer | MERN Stack | End-to-End Solutions",
    devops: "DevOps Engineer | CI/CD | Cloud Infrastructure Automation",
    cybersecurity: "Cyber Security Analyst | Network Security | Risk Management",
    mobile: "Mobile App Developer | Flutter | Cross-Platform Apps",
    uiux: "UI/UX Designer | Figma | Human-Centered Design"
  };

  return headlines[role];
}