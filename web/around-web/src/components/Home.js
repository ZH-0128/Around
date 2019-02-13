import React from 'react';
import {Tabs, Button, Spin} from 'antd';
import {GEO_OPTIONS, POS_KEY, API_ROOT, TOKEN_KEY, AUTH_HEADER} from "../constants";

const TabPane = Tabs.TabPane;


export class Home extends React.Component {


  // 1. get user location

  state = {
    isLoadingGeoLocation: false,
    error: '',
    isLoadingPosts: false,
    posts: [],
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      this.setState({isLoadingGeoLocation: true});
      navigator.geolocation.getCurrentPosition(
          this.onSuccessLoadGeoLocation,
          this.onFailedLoadGeoLocation,
          GEO_OPTIONS,
      );
    } else {
      this.setState({error: 'Geolocation is not supported.'});
    }
  }

  onSuccessLoadGeoLocation = (position) => {
    console.log(position);
    const {latitude, longitude} = position.coords;
    localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
    this.setState({isLoadingGeoLocation: false});
    this.loadNearbyPosts();
  };

  onFailedLoadGeoLocation = () => {
    this.setState({isLoadingGeoLocation: false, error: 'Failed to load geolocation.'});
  };

  loadNearbyPosts = () => {
    // Hit API
    const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
    const token = localStorage.getItem(TOKEN_KEY);
    this.setState({isLoadingPosts: true, error: ''});

    fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`, {
      method: 'GET',
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to load posts.');
    }).then((data) => {
      console.log(data);
      this.setState({isLoadingPosts: false, posts: data ? data : []});
    }).catch((e) => {
      console.log(e.message);
      this.setState({isLoadingPosts: false, error: e.message});
    });


  };

  getImagePosts = () => {
    const {error, isLoadingGeoLocation, isLoadingPosts, posts} = this.state;
    if (error) {
      return <div>{error}</div>
    } else if (isLoadingGeoLocation) {
      return <Spin tip="Loading geo location..."/>
    } else if (isLoadingPosts) {
      return <Spin tip="Loading posts..."/>
    } else if (posts && posts.length > 0) {
      return <div>{JSON.stringify(posts)}</div>;
      // return (<Gallery images={images}/>);
    } else {
      return 'No nearby posts.';
    }
  };


  render() {


    const operations = <Button type="primary">Create new post</Button>;
    return (
        <Tabs className='main-tabs' tabBarExtraContent={operations}>
          <TabPane tab="Image posts" key="1">
            <div>
              {this.getImagePosts()}
            </div>
          </TabPane>
          <TabPane tab="Video posts" key="2">Content of tab 2</TabPane>
          <TabPane tab="Map" key="3">Content of tab 3</TabPane>
        </Tabs>
    );
  }
}