import app from "./app/app.js";
import { connectDB } from "./config/db.js"; 

await connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
