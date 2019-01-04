import React, { Component } from 'react';


class AdminPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      user_datas:[],
      token:'',
      remember_me:true,
      models:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getDatasApi = this.getDatasApi.bind(this);
    this.bindModel = this.bindModel.bind(this);
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
        identifier: e.target.email.value,
        password: e.target.password.value,
        rememberMe: true
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(typeof responseJson.error === "undefined"){
        sessionStorage.setItem('user_datas', JSON.stringify(responseJson.user));
        sessionStorage.setItem('token', JSON.stringify(responseJson.jwt));
        this.setState({ token:JSON.stringify(responseJson.jwt), user_datas:JSON.stringify(responseJson.user) });
        this.getDatasApi(responseJson.jwt);
      }
    })
    e.preventDefault();
  }

  logOut() {
    sessionStorage.clear();
    window.location="";
  }

  bindModel() {
    //console.log(this.value);
  }

  getDatasApi(token) {
      fetch('http://localhost:1337/content-manager/models', {
        method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
        }
      }).then((response) => response.json())
      .then((responseJson) => {
          this.setState({models:responseJson.models.models})
          sessionStorage.setItem('models', JSON.stringify(responseJson.models.models));
      })
  }

  componentDidMount() {
    var token = sessionStorage.getItem('token');
    if(token){
      fetch('http://localhost:1337/admin', {
        method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
        }
      }).then((responseJson) => {
        if(responseJson.status!==200){
          sessionStorage.clear();
          this.setState({ user_datas:'' });
        } else {
          let mods = JSON.parse(sessionStorage.getItem('models'));
          this.setState({models:mods})
        }
      })
    }
  }


  render() {
    var token = sessionStorage.getItem('token');
    if (token){
      let user_datas = JSON.parse(sessionStorage.getItem('user_datas'));
      console.log(this.state.models);
      let arr = this.state.models;
      var size = Object.keys(this.state.models).length;
      console.log(size)
      for (var i=0; i<=size; i++) {
        console.log(arr.article)
      }
      
      
      return (
        <div className="admin-panel">
            <h1>Bonjour <strong>{user_datas.username}</strong><button onClick={this.logOut} className="logout">Logout</button></h1>
            <div className="nav-admin">
              <h2>Liste des Models :</h2>
              { Object.keys(this.state.models).map((item, i) => (
                <li key={i}>
                {console.log(typeof item)}
                    <button className="btn-parent" onClick={this.bindModel}>{item}</button>
                </li>
              )) }
            </div>
        </div>);
    } else { 
      return(
        <form onSubmit={this.handleSubmit} className="foglight-form log">
          <h2>Connexion</h2>
          <input type="text" onChange={this.handleChange} name="email" value={this.state.email || 'lucas'}  placeholder="Your name"/>
          <input type="password" onChange={this.handleChange} name="password" value={this.state.password || 'madmixp75*'}  placeholder="Your password"/>
          <input type="submit"/>
        </form>);
    }
  }
}

export default AdminPanel



