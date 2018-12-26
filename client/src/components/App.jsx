import React from 'react';
import Header from './Header';
import Row from './Row';
import axios from 'axios';

import './../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      now: new Date(),
      isBtnClicked: false,
      name: '',
      posts: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.changeName = this.changeName.bind(this);
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

  // componentDidMount() {
  //   setInterval(
  //     () => {
  //       this.tick()
  //     }, 1000
  //   );
  // }
  //
  // tick() {
  //   this.setState({
  //     now: new Date()
  //   })
  // }

  handleClick() {
    console.log('Clicked');

    this.setState({
      isBtnClicked: true,
    })
  }

  handleForm(event) {
    event.preventDefault();
    console.log('FORM SENT');
    const name = this.state.name;
    console.log('отправлены данные ', name);
  }

  changeName(event) {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
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

  render() {
    const now = this.state.now.toLocaleTimeString();
    const isBtnClicked = this.state.isBtnClicked ? <p>Clicked</p> : <p>Not clicked</p>;
    const isBtnClickedState = this.state.isBtnClicked;

    const name = this.state.name;

    const posts = this.state.posts;

    return (
      <div>

        <Header/>
        <div>{ now }</div>
        <ul>
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
        App component
        <button onClick={this.handleClick}>Click me!</button>
        {/*{isBtnClicked}*/}

        {isBtnClickedState && <p>Clicked!</p>}
        {!isBtnClickedState && <p>Not clicked</p>}

        <form>
          <input type="text" value={name} placeholder="Name" onChange={this.changeName}/>
          <button onClick={this.handleForm}>Send</button>
        </form>

      </div>
    )
  }
}

export default App;