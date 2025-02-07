import { app } from "../infrastructure/http/server";

// Porta default para exemplo
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});