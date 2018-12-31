import React, { Component } from 'react';

let is_active = false;


function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}


class AdminPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  handleSubmit(e) {
    fetch('http://localhost:1337/auth/local', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: this.state.email,
        password: this.state.password,
        rememberMe: true
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(typeof responseJson.error === "undefined"){
        sessionStorage.setItem('user_datas', JSON.stringify(responseJson));
        is_active=true;
        window.location="/admin";
      } 
    })
    e.preventDefault();
  }

  logOut() {
    sessionStorage.clear();
    window.location="";
  }

  componentDidMount() {
    var user_datas = sessionStorage.getItem('user_datas');
    if(user_datas!=null){
      user_datas = JSON.parse(user_datas);
      fetch('http://localhost:1337/users', {
        method: 'GET',
          headers: {
            Authorization: `Bearer ${user_datas.jwt}`
        }
      }).then((response) => response.json())
      .then((responseJson) => {
        if(typeof responseJson.error === "undefined"){
          sessionStorage.setItem('user_datas', JSON.stringify(responseJson));
          is_active=true;
        }
      })
    }
    this.mounted = true;
  }
  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    let user_datas = sessionStorage.getItem('user_datas');
    var content ="";
    if (user_datas!=null) {
      content = <div><p>connecté</p><button onClick={this.logOut}>Déco</button></div>;
    } else {
      content = <form onSubmit={this.handleSubmit} className="foglight-form">
                  <h2>Connexion</h2>
                  <p>lucas</p>
                  <p>madmixp75*</p>
                  <input type="text" onChange={this.handleChange} name="email" value={this.state.email || ''}  placeholder="Enter your email..."/>
                  <input type="text" onChange={this.handleChange} name="password" value={this.state.password || ''}  placeholder="Enter your password..."/>
                  <input type="submit"/>
                </form>;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default AdminPanel



