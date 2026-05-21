document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const loginMessage = document.getElementById("loginMessage"); // Hämtar p-taggen för fel/framgångsmeddelanden

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      
      console.log("Submit fungerar, skickar anrop...");

      try {
          const response = await fetch("http://localhost:3010/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  email,
                  password,
              }),
          });

          const data = await response.json();
          console.log(data);

          if (response.ok) {
              // 1. Spara JWT-token i localStorage
              localStorage.setItem("token", data.token);

              // Speciell lösning för din admin-sida:
              // Om admin loggar in (t.ex. admin@restaurang.com), sparar vi adminAccess så din admin-sida släpper in dig.
              if (email.toLowerCase() === "admin@restaurang.com") {
                  localStorage.setItem("adminAccess", "true");
                  
                  loginMessage.style.color = "green";
                  loginMessage.textContent = "Inloggad som Admin! Skickas till adminpanelen...";
                  
                  setTimeout(() => {
                      window.location.href = "adminpage.html";
                  }, 1200);
              } else {
                  // Vanlig kund loggar in
                  localStorage.setItem("adminAccess", "false"); // Se till att de inte är admin
                  
                  loginMessage.style.color = "green";
                  loginMessage.textContent = "Inloggning lyckades! Skickas till menyn...";
                  
                  // 2. Skicka användaren vidare till matsidan efter 1,2 sekunder
                  setTimeout(() => {
                      window.location.href = "index.html"; 
                  }, 1200);
              }

          } else {
              // Visa felmeddelande från backend (t.ex. "Fel email eller lösenord")
              loginMessage.style.color = "#b14b4b";
              loginMessage.textContent = data.message;
          }

      } catch (err) {
          console.error("LOGIN ERROR:", err);
          loginMessage.style.color = "#b14b4b";
          loginMessage.textContent = "Kunde inte ansluta till servern. Körs backend?";
      }
  });
});