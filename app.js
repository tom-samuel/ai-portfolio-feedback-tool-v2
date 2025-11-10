// DOM elements
const submitBtn = document.getElementById('submitBtn');
const portfolioInput = document.getElementById('portfolioInput');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackContent = document.getElementById('feedbackContent');
const loadingSection = document.getElementById('loadingSection');

// MOCK function to simulate AI response
async function getAIResponseMock(portfolioURL) {
  // Simulate AI processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `✅ Feedback for: ${portfolioURL}\n\n` +
        "- Portfolio layout is clean and professional.\n" +
        "- Typography hierarchy is clear and readable.\n" +
        "- Colors are consistent and visually appealing.\n" +
        "- Navigation is intuitive; consider adding a 'Contact' section.\n" +
        "- Overall UX is strong and polished."
      );
    }, 1500); // 1.5 second delay
  });
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
    const feedback = await getAIResponseMock(url);

    // Hide loading, show feedback
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
    alert("Error generating feedback. Try again.");
    console.error(error);
  }
});
