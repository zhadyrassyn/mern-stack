import React from 'react';
import Header from './Header';
import Row from './Row';
import axios from 'axios';

import './../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showAddModal: false,
      addAuthor: '',
      addTitle: '',
      addContent: '',
    };
  }

  componentDidMount() {
    axios('http://localhost:3001/api/posts')
      .then((success) => {
        this.setState({
          posts: success.data.posts
        })
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  handleDelete(deleteId) {
    console.log('handleDelete ', deleteId);
    axios.delete('http://localhost:3001/api/posts/' + deleteId)
      .then((success) => {
        console.log(success);
        if (success.status === 200) {
          const posts = this.state.posts.filter((post) => post._id !== deleteId);
          this.setState({
            posts: posts
          })
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  showAddPostModalBtnClick = (event) => {
    event.preventDefault();

    this.setState({
      showAddModal: true,
    })
  };

  handleCloseAddModal = (event) => {
    event.preventDefault();

    this.setState({
      showAddModal: false,
    })
  };

  changeInput = (event) => {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSavePost = (event) => {
    event.preventDefault();

    const { addAuthor, addTitle, addContent } = this.state;

    const newPost = {
      author: addAuthor,
      title: addTitle,
      content: addContent,
    };

    axios.post('http://localhost:3001/api/posts', newPost)
      .then((success) => {
        const savedPost = success.data.savedPost;

        const posts = this.state.posts;
        posts.push(savedPost);

        this.setState({
          posts: posts,
          showAddModal: false,
          addAuthor: '',
          addTitle: '',
          addContent: '',
        });

      })
      .catch((error) => {
        console.log(error);
      })
  };

  render() {
    const posts = this.state.posts;
    const showAddModal = this.state.showAddModal;
    // const { showAddModal } = this.state;

    const { addAuthor, addTitle, addContent } = this.state;

    return (
      <div>

        {showAddModal &&
        <div id="myModal" className="modal">


          <div className="modal-content">
            <div className="modal-header">
              <h2>Добавить пост</h2>
              <span className="close-modal"
                    onClick={this.handleCloseAddModal.bind(this)}>&times;</span>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control my-2"
                  placeholder="Автор поста"
                  value={addAuthor}
                  name="addAuthor"
                  onChange={this.changeInput.bind(this)}
              />
              <input type="text" className="form-control"
                  placeholder="Название поста"
                  value={addTitle}
                  name="addTitle"
                  onChange={this.changeInput.bind(this)}
              />
              <textarea className="form-control my-2"
                  placeholder="Контент поста"
                  value={addContent}
                  name="addContent"
                  onChange={this.changeInput.bind(this)}
              />

            </div>
            <div className="modal-footer">
              <div className="my-2">
                <button className="btn btn-secondary mr-2"
                  onClick={this.handleCloseAddModal.bind(this)}>Отменить</button>
                <button className="btn btn-info" onClick={this.handleSavePost.bind(this)}>
                  Добавить
                </button>
              </div>
            </div>
          </div>

        </div>
        }

        <Header/>

        <button onClick={this.showAddPostModalBtnClick.bind(this)}>Создать пост</button>
        <ul className="list-group">
          {
            posts.map((post) => {
              return <Row
                key={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                _id={post._id}
                handleDelete={this.handleDelete.bind(this)}
              />
            })
          }
        </ul>

      </div>
    )
  }
}

export default App;