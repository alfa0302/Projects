const apiKey = "d564900933085c52cf67202c73b7b7e5";

const optionsContainer = document.querySelector(".options-container");
const container = document.querySelector(".container");

const options = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

generateOptions();
generateNewsByCategory();

// Generate options buttons
function generateOptions() {
  options.forEach((value) => {
    const option = document.createElement("button");
    option.textContent = value;
    option.classList.add("option");
    option.dataset.category = value;
    optionsContainer.appendChild(option);
  });
}

// Attach event listeners to buttons for category-specific news
function generateNewsByCategory() {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const category = option.dataset.category;
      container.innerHTML = ""; // Clear the container before loading new news
      generateNews(category);
    });
  });
}

// Fetch news by category and display it
async function generateNews(category) {
  try {
    const response = await fetch(
      `https://api.mediastack.com/v1/news?access_key=${apiKey}&limit=100&languages=en&categories=${category}`
    );
    const data = await response.json();
    const newsArray = data.data;
    newsArray.forEach((news) => {
      if (news.image) {
        showNews(news);
      }
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Display news items on the page
function showNews(news) {
  const div = document.createElement("div");
  div.classList.add("news");
  div.innerHTML = `
    <h4>
      <a href='${news.url}' target='_blank'>${news.title}</a>
    </h4>
    <div class="contents">
      <div class="description">
        ${news.description}
      </div>
      <img src='${news.image}' alt="${news.title}" />
    </div>`;
  container.appendChild(div);
}

// Load default category news on page load
generateNews("general");
