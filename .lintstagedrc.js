module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint ', 'git add'],
  // '**/*.{js,jsx}': ['eslint --fix --max-warnings=0', 'git add']
  // './src/**/*.js': filenames => filenames.map(filename => {
  //   return 'eslint --fix'
  // })
  // ,
  // './src-ts/**/*': files => {
  //   console.log(JSON.stringify(files));
  //   return ['echo \'sss\'', 'cd src-ts && npm run precommit']
  // }
}