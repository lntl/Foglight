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
      models:[],
      curent_datas_model:[],
      curent_single_datas:[],
      curent_content:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getDatasApi = this.getDatasApi.bind(this);
    this.bindModel = this.bindModel.bind(this);
    this.getDatasFromModel = this.getDatasFromModel.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.setDatas = this.setDatas.bind(this);
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

  setDatas(e) {
    this.state.curent_single_datas.content = this.state.curent_content;
    var token = sessionStorage.getItem('token');
    console.log(this.state.curent_single_datas);
    var id = this.state.curent_single_datas.id;
    console.log(token);
    fetch('http://localhost:1337/content-manager/explorer/articles?id='+id, {
      method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        content: this.state.curent_single_datas.content,
        date_create: this.state.curent_single_datas.date_create,
        id: this.state.curent_single_datas.id,
        title: this.state.curent_single_datas.title,
        url_slug: this.state.curent_single_datas.url_slug,
        __v:this.state.curent_single_datas.__v,
        _id:this.state.curent_single_datas.id
      })
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
    })
    e.preventDefault();
  }

  logOut() {
    sessionStorage.clear();
    window.location="";
  }

  bindModel(e) {
    var target = e.target.dataset.target;
    this.getDatasFromModel(target);
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

  toggleShow(e) {
    var target = e.target.dataset.target;
    this.setState({curent_single_datas: this.state.curent_datas_model[target]})
    this.setState({curent_content: this.state.curent_datas_model[target].content});
  }

  getDatasFromModel(model) {
    var url = 'http://localhost:1337/'+model+'s';
    fetch(url)
    .then(res => res.json())
    .then((result) => {
      this.setState({curent_datas_model: result});
    },);
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
      return (
        <div className="admin-panel">
            <h1>Bonjour <strong>{user_datas.username}</strong><button onClick={this.logOut} className="logout">Logout</button></h1>
            <div className="nav-admin">
              <h2>Content Type</h2>
              { Object.entries(this.state.models).map((item, i) => (
                <li key={i}>
                    <button className="btn-parent" onClick={this.bindModel} data-target={item[1].collectionName}>{item[1].labelPlural}</button>
                </li>
              )) }
            </div>
            <div className="content-model">
                <ul className="listof">
                  {this.state.curent_datas_model.map((datas, key) =>
                    <li key={datas.id} onClick={this.toggleShow} data-target={key}>{datas.title}</li>
                  )}
                </ul>
                <div className="toggle-content">
                  <p>Modifier le contenu</p>
                  <form onSubmit={this.setDatas} data-target="model" data-id={this.state.curent_single_datas._id}>
                    <textarea className="area" type="text" name="curent_content" value={this.state.curent_content} onChange={this.handleChange} />
                    <button>Submit</button>
                  </form>
                </div>
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



