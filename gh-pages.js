import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/GaganSharmaGitHub/gagan.me', // Update to point to your repository
  user: {
   name: 'Gagan Sharma', // update to use your name
   email: 'gagan3103sharma2000@gmai.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);