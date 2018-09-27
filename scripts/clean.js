const rimraf = require('rimraf');

const mustDelete = [
  'dist/',
];

mustDelete.forEach((item) => {
  rimraf(item, (e) => {
    if (e) {
      console.log(e);
    }
  });
  console.log(`${item} has removed successfully.`);
});
