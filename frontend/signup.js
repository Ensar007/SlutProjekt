document.addEventListener("DOMContentLoaded", () => {
  console.log("ridwan somna")
    const form = document.getElementById("signupForm");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      console.log("Submit funkar");
  
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      const username = firstName + " " + lastName;
      console.log(firstName)
      try {
        const response = await fetch("http://localhost:3010/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });

      
  
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          // Skapa en snygg alert eller meddelande
          alert("Konto skapat framgångsrikt! Du skickas nu till inloggningen.");
      // HÄR ÄR FIXEN: Skicka användaren vidare till Login.html
      window.location.href = "Login.html";
    } else {
        // Om backenden skickar ett felmeddelande (t.ex. om mailen redan finns)
        alert(data.message || "Kunde inte skapa konto.");
    }
    
    } catch (error) {
    console.error("SIGNUP ERROR:", error);
    alert("Något gick fel vid anslutningen till servern.");
    }
    });
  });