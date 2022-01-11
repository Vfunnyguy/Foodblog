const mongoose = require('mongoose');
const URI = process.env.MONGODB_URL;
mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err;
    console.log('Kết nối thành công tới Mongo');
});
//# sourceMappingURL=database.js.map