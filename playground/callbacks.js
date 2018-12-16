// var getUser = (id) => {
//   var user = {
//     id: id,
//     name: 'Jackson'
//   };
//
//   return user;
// }

var getUser = function(id, success, error) {
  var user = {
    id: id,
    name: 'Jackson'
  };

  setTimeout(() => {
    if (id <= 10) {
      success(user);
    } else {
      error('Пользователь не существует')
    }
  }, 3000);
};

getUser(5, function(user) {
  console.log(user);
}, function(error) {
  console.log('error is ', error);
});