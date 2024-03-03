try {
 const mongoose = require('mongoose');
 mongoose.connect('mongodb://127.0.0.1:27017/e-dashboard'); 
} catch (error) {
 console.error("Error in config.js", error);
}