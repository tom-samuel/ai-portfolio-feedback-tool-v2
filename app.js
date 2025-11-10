// DOM elements
const submitBtn = document.getElementById('submitBtn');
const portfolioInput = document.getElementById('portfolioInput');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackContent = document.getElementById('feedbackContent');
const loadingSection = document.getElementById('loadingSection');

// Replace this with your OpenAI API key (never expose publicly in production!)
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// Function to fetch AI feedback
async function getAIResponse(portfolioURL) {
  const prompt = `Provide constructive feedback for this portfolio URL: ${portfolioURL}.
Focus on UI/UX design, usability, aesthetics, and overall impression.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Button click event
submitBtn.addEventListener('click', async () => {
  const url = portfolioInput.value.trim();
  if (!url) {
    alert("Please enter a valid portfolio URL.");
    return;
  }

  // Show loading
  loadingSection.style.display = 'block';
  feedbackSection.style.display = 'none';
  feedbackContent.innerHTML = '';

  try {
    const feedback = await getAIResponse(url);

    loadingSection.style.display = 'none';
    feedbackSection.style.display = 'block';

    // Split feedback into paragraphs
    const paragraphs = feedback.split("\n").filter(p => p.trim() !== "");
    paragraphs.forEach(p => {
      const div = document.createElement('div');
      div.className = "feedback-item p-3 mb-3 bg-gray-50 rounded shadow-sm fade-in";
      div.textContent = p;
      feedbackContent.appendChild(div);
    });

  } catch (error) {
    loadingSection.style.display = 'none';
    alert("Error fetching AI feedback. Check your API key and network.");
    console.error(error);
  }
});
