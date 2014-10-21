module.exports = function(seed, _arg) {
  var FB_USER;
  FB_USER = _arg.FB_USER;
  return [
    {
      id: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      name: 'Charis',
      username: 'charis.elliott.7',
      token: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      tokenSecret: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      location: 'Tempe, Arizona'
    }, {
      id: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      name: 'Jessica',
      username: 'jesslove4',
      token: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      tokenSecret: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      gender: 'female',
      location: 'Tempe, Arizona'
    }, {
      id: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      name: 'Kyndal',
      username: 'kyndal.gannon',
      token: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      tokenSecret: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      location: 'Scottsdale, Arizona'
    }
  ];
};
