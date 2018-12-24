import React from 'react';
import Header from './Header';
import Row from './Row';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      now: new Date()
    }
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

  render() {
    const now = this.state.now.toLocaleTimeString();

    const posts = [
      {
        title: 'Chelovek-pauk',
        content: '18+',
        author: 'Stephen Faigy'
      },
      {
        title: 'Zhelezniy chelovek',
        content: '13+',
        author: 'Dzheiymi Lanister'
      }
    ];

    return (
      <div>

        <Header/>
        <div>{ now }</div>
        <ul>
          {
            posts.map(function(post) {
              return <Row
                title={post.title}
                content={post.content}
                author={post.author}
              />
            })
          }
        </ul>
        App component
      </div>
    )
  }
}

export default App;