import React from 'react';

import { connect } from 'react-redux';

import {
  getProfilePosts,
  saveProfilePost,
  deleteProfilePost,
  updateProfilePost,
  getProfile,
  changeProfileAva,
} from "../actions/actions";

import defaultAva from './../images/defaultAva.png';

import Row from './../components/Row';

class Profile extends React.Component {
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
      saveImage: null,
    };
  }

  componentDidMount() {
    this.props.getProfile();
    this.props.getProfilePosts();
  }

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

  handleDelete(deleteId) {
    this.props.deleteProfilePost(deleteId);
  };

  renderPosts = (posts) => {
    return posts.map((post) => {
      return <Row
        key={post._id}
        title={post.title}
        content={post.content}
        author={post.author}
        image={post.image}
        _id={post._id}
        handleDelete={this.handleDelete.bind(this)}
        handleEdit={this.handleEdit.bind(this)}
        authenticated={true}
      />
    })
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

    this.props.updateProfilePost(editPostId, updatePost, () => {
      this.setState({
        showEditModal: false,
        editAuthor: '',
        editTitle: '',
        editContent: '',
      });
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
    const saveImage = this.state.saveImage;

    var formData = new FormData();
    formData.append("author", addAuthor);
    formData.append("title", addTitle);
    formData.append("content", addContent);
    formData.append("file", saveImage);

    this.props.saveProfilePost(formData, () => {
      this.setState({
        showAddModal: false,
        addAuthor: '',
        addTitle: '',
        addContent: '',
        saveImage: null
      });
    });
  };

  handleFileChange(event) {
    this.setState({
      saveImage: event.target.files[0]
    });
  }

  handleAvaChangeEvent(event) {
   const image = event.target.files[0];

   if (image) {
     const formData = new FormData();
     formData.append('file', image);

     // call action
     this.props.changeAva(formData);
   }
  }

  render() {
    const posts = this.props.posts;
    const showAddModal = this.state.showAddModal;
    const addAuthor = this.state.addAuthor;
    const addTitle = this.state.addTitle;
    const addContent = this.state.addContent;

    const showEditModal = this.state.showEditModal;
    const editAuthor = this.state.editAuthor;
    const editTitle = this.state.editTitle;
    const editContent = this.state.editContent;

    const profile = this.props.profile;

    return (
      <div className="pt-2 px-2">

        { profile.avaPath &&
          <label htmlFor="avaFileInput">
            <img src={"http://localhost:3001" + profile.avaPath + "?cb=" + (new Date()).toString()} alt="ava"/>
          </label>

        }

        { !profile.avaPath &&
          <label htmlFor="avaFileInput">
            <img src={defaultAva} alt="ava"/>
          </label>
        }

        <input type="file" id="avaFileInput" className="d-none" onChange={this.handleAvaChangeEvent.bind(this)}/>

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
              <div className="input-group mb-3">
                <input type="file" className="form-control-file"
                       onChange={this.handleFileChange.bind(this)}
                />
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

        <h3>Мои посты</h3>
        <ul className="list-group">
          {this.renderPosts(posts)}
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
    posts: state.profile.posts,
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfilePosts: () =>
      dispatch(getProfilePosts()),

    saveProfilePost: (newPost, changeState) => {
      dispatch(saveProfilePost(newPost, changeState));
    },

    updateProfilePost: (id, newPost, changeState) => {
      dispatch(updateProfilePost(id, newPost, changeState));
    },

    deleteProfilePost: (id) => {
      dispatch(deleteProfilePost(id));
    },

    getProfile: () => dispatch(getProfile()),

    changeAva: (formData) => {
      dispatch(changeProfileAva(formData));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);