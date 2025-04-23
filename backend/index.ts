import app from "./app";

import { PORT } from "./src/configs/config";

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
