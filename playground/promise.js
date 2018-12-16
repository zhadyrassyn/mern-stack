var getUser = (id) => {
  var user = {
    id: id,
    name: "Jackson"
  };

  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (id <= 10) {
        resolve(user);
      } else {
        reject('Пользователь не существует');
      }
    }, 3000)
  });
};

// console.log(getUser(5));

getUser(2100).then(function(user) {
  console.log('Пользовель ', user);

  return getUser(8);
}).then(function(user) {
  console.log('Пользователь ', user);
}).catch(function(error) {
  console.log('Error is ', error);
})
