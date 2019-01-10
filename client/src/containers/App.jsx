import React from 'react';
import Header from './../components/Header';
import Row from './../components/Row';
import { connect } from 'react-redux';
import { fetchPosts} from "../actions/actions";

import './../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddModal: false,
      addAuthor: '',
      addTitle: '',
      addContent: '',
      showEditModal: false,
      editAuthor: '',
      editTitle: '',
      editContent: '',
      editPostId: 0,
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts = (posts) => {
    return posts.map((post) => {
      return <Row
        key={post._id}
        title={post.title}
        content={post.content}
        author={post.author}
        _id={post._id}
        handleDelete={this.handleDelete.bind(this)}
        handleEdit={this.handleEdit.bind(this)}
      />
    })
  };

  handleDelete(deleteId) {
    console.log('handleDelete ', deleteId);
    // axios.delete('http://localhost:3001/api/posts/' + deleteId)
    //   .then((success) => {
    //     console.log(success);
    //     if (success.status === 200) {
    //       const posts = this.state.posts.filter((post) => post._id !== deleteId);
    //       this.setState({
    //         posts: posts
    //       })
    //     }
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  };

  handleEdit = (id, author, title, content) => {
    this.setState({
      showEditModal: true,
      editAuthor: author,
      editTitle: title,
      editContent: content,
      editPostId: id
    });
  };

  handleAddShowModal = (event) => {
    event.preventDefault();
    const showAddModal = this.state.showAddModal;

    this.setState({
      showAddModal: !showAddModal,
      addAuthor: '',
      addTitle: '',
      addContent: '',
    })

  };

  handleEditShowModal = (event) => {
    event.preventDefault();
    const showEditModal = this.state.showEditModal;

    this.setState({
      showEditModal: !showEditModal,
      editAuthor: '',
      editTitle: '',
      editContent: '',
      editPostId: 0,
    });
  };

  handleModalInputsChange = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    const inputName = event.target.name;

    this.setState({
      [inputName]: inputValue,
    })
  };

  handleAddPost = (event) => {
    const addAuthor = this.state.addAuthor;
    const addTitle = this.state.addTitle;
    const addContent = this.state.addContent;

    const newPost = {
      author: addAuthor,
      title: addTitle,
      content: addContent
    };

    // axios.post('http://localhost:3001/api/posts', newPost)
    //   .then((success) => {
    //     console.log('success ', success);
    //     if (success.status === 200) {
    //       const savedPost = success.data.savedPost;
    //       const posts = this.state.posts;
    //       posts.push(savedPost);
    //       this.setState({
    //         posts: posts,
    //         showAddModal: false,
    //         addAuthor: '',
    //         addTitle: '',
    //         addContent: '',
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  handleEditPost = (event) => {
    event.preventDefault();
    const editAuthor = this.state.editAuthor;
    const editTitle = this.state.editTitle;
    const editContent = this.state.editContent;
    const editPostId = this.state.editPostId;

    const updatePost = {
      author: editAuthor,
      title: editTitle,
      content: editContent,
    };

    // axios.put('http://localhost:3001/api/posts/' + editPostId, updatePost)
    //   .then((success) => {
    //     console.log('success ', success);
    //     if (success.status === 201) {
    //       const savedPost = success.data.updatePost;
    //       let posts = this.state.posts;
    //       const index = posts.findIndex(post => post._id === savedPost._id);
    //       console.log(posts);
    //       console.log(index);
    //       if (index >= 0) {
    //         posts.splice(index, 1, savedPost);
    //       }
    //
    //       this.setState({
    //         posts: posts,
    //         showEditModal: false,
    //         editAuthor: '',
    //         editTitle: '',
    //         editContent: '',
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  render() {
    console.log(this.props);
    const posts = this.props.posts;
    const showAddModal = this.state.showAddModal;
    const addAuthor = this.state.addAuthor;
    const addTitle = this.state.addTitle;
    const addContent = this.state.addContent;

    const showEditModal = this.state.showEditModal;
    const editAuthor = this.state.editAuthor;
    const editTitle = this.state.editTitle;
    const editContent = this.state.editContent;


    return (
      <div className="px-2 py-2">

        <Header/>

        {showAddModal &&
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h2>Добавить новый пост</h2>
              <span className="close" onClick={this.handleAddShowModal.bind(this)}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="input-group my-3">
                <input type="text" className="form-control" name="addAuthor" placeholder="Author"
                       onChange={this.handleModalInputsChange.bind(this)} value={addAuthor}/>
              </div>
              <div className="input-group">
                <input type="text" className="form-control" name="addTitle" placeholder="Title"
                       onChange={this.handleModalInputsChange.bind(this)} value={addTitle}/>
              </div>
              <div className="input-group my-3">
                <textarea type="text" className="form-control" name="addContent" placeholder="Content..."
                          onChange={this.handleModalInputsChange.bind(this)} value={addContent}/>
              </div>
            </div>
            <div className="modal-footer">
              <div className="my-2">
                <button className="btn btn-secondary mr-2" onClick={this.handleAddShowModal.bind(this)}>Отменить</button>
                <button className="btn btn-success" onClick={this.handleAddPost.bind(this)}>Добавить</button>
              </div>
            </div>
          </div>
        </div>
        }

        <div>
          <button className="btn btn-primary my-2" onClick={this.handleAddShowModal.bind(this)}><i className="fas fa-plus-circle"></i></button>
        </div>
        <ul className="list-group">
          { this.renderPosts(posts) }
        </ul>


        {showEditModal &&
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h2>Отредактировать пост</h2>
              <span className="close" onClick={this.handleEditShowModal.bind(this)}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="input-group my-3">
                <input type="text" className="form-control" name="editAuthor" placeholder="Author"
                       onChange={this.handleModalInputsChange.bind(this)} value={editAuthor}/>
              </div>
              <div className="input-group">
                <input type="text" className="form-control" name="editTitle" placeholder="Title"
                       onChange={this.handleModalInputsChange.bind(this)} value={editTitle}/>
              </div>
              <div className="input-group my-3">
                <textarea type="text" className="form-control" name="editContent" placeholder="Content..."
                          onChange={this.handleModalInputsChange.bind(this)} value={editContent}/>
              </div>
            </div>
            <div className="modal-footer">
              <div className="my-2">
                <button className="btn btn-secondary mr-2" onClick={this.handleEditShowModal.bind(this)}>Отменить</button>
                <button className="btn btn-success" onClick={this.handleEditPost.bind(this)}>Изменить</button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts())
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);