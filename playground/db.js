var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function(error) {
  if (error) {
    console.log('error happened ', error);
    throw error;
  } else {
    console.log('connected to db succesfully');
  }
});

const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  author: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

// СОЗДАНИЕ НОВОГО ПОСТА

const post = new Post({
  title: 'Новые автобусы',
  content: 'Байбек посетил...',
  author: 'Нуржан'
});

// post.save().then(function(createdPost) {
//   console.log('post saved ', createdPost);
// }).catch(function(error) {
//   console.log(error);
// });

// ПОИСК ЭЛЕМЕНТА В БАЗЕ ПО ID
// Post.findById('5c15118de5359014d371f1b8').then((post) => {
//   console.log('пост из базы ', post);
// }).catch((error) => {
//   console.log('error is ', error);
// });

//УДАЛЕНИЕ ЭЛЕМЕНТА ПО ID
// Post.findByIdAndDelete('5c15118de5359014d371f1b8').then((deletedPost) => {
//   console.log('Из базы удалился пост ', deletedPost);
// }).catch((e) => {
//   console.log('Ошибка ', e);
// });


//ВЫТАЩИТЬ ВСЕ ПОСТЫ
// Post.find().then((posts) => {
//   console.log('Все посты с базы ', posts);
// }).catch((error) => {
//   console.log('error ', error);
// });

// Обновление поста
// Post.findByIdAndUpdate('5c15118de5359014d371f1b8', {$set: {
//   title: 'NewTitle',
//   content: 'So good content',
//   author: 'Braun T'
// }}, {new: true})
//   .then(function(updatedPost) {
//     console.log('updatedPost', updatedPost);
//   }).catch(function(error) {
//     console.log(error);
//   });