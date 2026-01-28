const textarea = document.getElementById('userText');
const charCount = document.getElementById('charCount');
const charLimitMessage = document.getElementById('charLimitMessage');

const maxLength = textarea.maxLength;

textarea.addEventListener("input", function () {
  const len = textarea.value.length;
  charCount.textContent = `Character counter: ${len} / ${maxLength}`;

  if (len >= maxLength) {
    charCount.classList.add('limit-reached');
    if (charLimitMessage) {
      charLimitMessage.style.display = 'block';
    }
  } else {
    charCount.classList.remove('limit-reached');
    if (charLimitMessage) {
      charLimitMessage.style.display = 'none';
    }
  }
});
