var glob = require('glob')

// glob('**/*.jpg', undefined, (er, files) => {
//     console.log('files', files);
//     console.log('files', er);
// });

console.log(glob.sync('**/*.jpg')); 



