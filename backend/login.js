app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    

    try {
  
      // Hitta användaren via email
      const result = await db.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );
  
      // Om ingen användare finns
      if (result.rows.length === 0) {
        return res.status(401).json({
          message: "Fel email eller lösenord",
        });
      }
  
      const user = result.rows[0];
  
      // Jämför lösenord
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      console.log(email);
        console.log(password);
        console.log(user.password);

      console.log(passwordMatch);
  
      // Om lösenordet är fel
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Fel email eller lösenord",
        });
      }
  
      // Skapa token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
  
      // Skicka token till frontend
      res.json({
        message: "Inloggad",
        token,
      });
  
    } catch (err) {
      console.error(err);
  
      res.status(500).json({
        message: "Något gick fel",
      });
    }
  });

  export default route;