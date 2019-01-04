import React, { Component } from 'react';
import Header from '../components/header';
import DateFormat from 'dateformat';



class EventPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:1337/evenements")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  render() {
    return (
      <div>
        <Header siteTitle="Evenements"/>
        <div className="content-site">
          <div className="container">
            <h1>Evenements</h1>
            <ul className="events">
              {this.state.items.map((item)=>
                <li key={item.id}>
                <h2>
                  {item.title}
                  <span className="date-time">
                    {item.create_date = DateFormat(item.create_date)}
                  </span>
                </h2>

                <p>{item.content}</p></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default EventPage
