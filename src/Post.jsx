import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate,useParams } from 'react-router-dom';

const Post = () => {
    const navigate = useNavigate(); 
    let { postID } = useParams();

    const [postData, setPostData] = useState([]);


    useEffect(() => {
         let thePost;
    
        // const fetchPosts = async () => {
        //   try {
        //     const response = await axios.get('http://localhost:8080/post/${postID}');
        //     if (response.status === 200) {
        //       thePost = response.data; 
        //     }
        //   } catch (error) {
        //     console.error('Error fetching posts:', error);
        //     setErrorMessage('Error.');
        //   }
        // };


        //FETCH VERSION
    const fetchPosts = async () => {
      try {
        console.log(postID);
        const response = await fetch(`http://localhost:8080/post/${postID}`,{
            method: 'GET'
        }
        );
        const data = await response.json();
        
        if (response.ok) {
            console.log(data);
          setPostData(data);
        } 
      } catch (error) {
        console.error('Error during getting post:', error);
      }
    };
    fetchPosts();
    
        // Hardcoded test data
        // const thePost = 
        //   {
        //     postID: 5,
        //     name: "Stagger Coffee",
        //     address: "1438 8th St, Los Angeles, USA",
        //     rating: 4.6,
        //     description: "Delicious lattes and friendly staff.",
        //     views: 1000,
        //     imageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
        //     time: "2024-11-08T09:30:34",
        //     ambiance: "Very good studyvibes",
        //   }
        // ;
      }, []);

      function signOut() {
        localStorage.removeItem("userID");
        navigate('/'); 
      }
    


      return (
        <div>
            <div style={{
              marginTop: '0px',
              width: '100%',
              height: '150px',
              overflow: 'hidden',
              justifyContent: 'left',
              alignItems: 'center',
              backgroundColor: '#cee7f1',
              boxSizing:' border-box'
            }}>
            <h1 style={{
                marginLeft: '100px',
                fontSize: '60px',
                color: '#581c14'
              }}>CAFE LA </h1> 
                <div style={{
                    position: 'absolute',
                    right: '100px',
                    top: '50px',
                    gap: '10px',
                }}>
                <Link to="/Profile">
                            <button className="Button" style={{marginRight:'10px'}}>Map</button>
                </Link>
                <Link to="/Profile">
                            <button className="Button" style={{marginRight:'10px'}}>Post</button>
                </Link>
                <Link to="/Profile">
                            <button className="Button" style={{marginRight:'10px'}}>Profile</button>
                </Link>
                <Link to="/">
                            <button className="Button" onClick= {() => signOut()}>Sign Out</button>
                </Link>
                
                </div>
            </div>
            <div style={{
              display : 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
                alignItems: 'center',
                marginTop:'100px'
            }}>

                <div style={{width: '500px', height:'500px' , backgroundColor: '#ffffff', overflow: 'hidden' ,marginRight:'200px'}}>
                <img 
                    src={postData.imageArray} 
                    alt={postData.name}
                    style={{ width: '100%' , height: '100%' }}
                    onError={(e) => { e.target.src = 'https://i.ibb.co/HHgB7Cm/cafe-Image.webp'; }}
                />
                </div>

                <div style={{
                display : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                            <h2 style={{ margin: '10px 0' , fontSize: '50px'}}>{postData.name}</h2>
                    <p style={{ margin: '5px 0', color: '#595959' , fontSize: '25px'}}>Address: {postData.address}</p>
                    <p style={{ margin: '5px 0', fontSize: '18px' ,color: '#a3a2a2'}}>
                        Rating: {postData.rating}/5 Stars
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '18px', color: '#a3a2a2' }}>
                        Views: {postData.views} people
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '16px', color: 'black' }}>
                        Description: {postData.description}
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '16px', color: 'black' }}>
                        Ambience: {postData.ambiance}
                    </p>



                </div>
            </div>
        </div>
      );
};
export default Post;
