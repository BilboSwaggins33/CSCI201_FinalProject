import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const Post = () => {
    const navigate = useNavigate();
    let { postID } = useParams();

    const [postData, setPostData] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const userInfo = localStorage.getItem('userInfo');




    useEffect(() => {
        if(!userInfo){
            setLoggedIn(false);
          }
          else{
            setLoggedIn(true);
          }
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
                const response = await fetch(`http://localhost:8080/post/${postID}`, {
                    method: 'GET'
                });
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
            <div class="background"> </div>
            <div style={{
                marginTop: '0px',
                width: '100%',
                height: '120px',
                overflow: 'hidden',
                justifyContent: 'left',
                alignItems: 'center',
                backgroundColor: '#cee7f1',
                boxSizing: ' border-box'
            }}>
                <div class="typewriter" 	  style={{
				marginLeft: '70px',
				marginTop: '30px',
		        fontSize: '60px', 
		        maxWidth: 'fit-content',
		        whiteSpace: 'nowrap',
		        borderRight: '2px solid #581c14', 
		        paddingRight: '10px', 
		      }}>
           <p>CAFE LA</p>
         </div>
                <div style={{
                    position: 'absolute',
                    right: '100px',
                    top: '40px',
                    gap: '10px',
                    display: 'flex',
                   flexDirection: 'row'
                }}>

            
            <Link to="/home">
            <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }}>Home</button>
          </Link>
          <Link to="/map">
                    <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white'  }}>Map</button>
                </Link>

          {isLoggedIn ? (
            <div>
                <Link to="/addpost">
                    <button className="Button" style={{ marginRight: '10px', borderRadius: '30px', color: 'white'  }}>Post</button>
                </Link>
                    <Link to="/Profile">
                            <button className="Button" style={{marginRight:'10px', borderRadius: '30px', color: 'white' }}>Profile</button>
                    </Link>
                    <Link to="/">
                            <button className="Button" style = {{borderRadius: '30px', color: 'white' }} onClick= {() => signOut()}>Sign Out</button>
                    </Link>
                </div>
                ):(
                    <div>
                    <Link to="/sign-in">
                            <button className="Button" style={{marginRight:'10px', borderRadius: '30px', color: 'white' }}>Sign In</button>
                    </Link>
                    
                    <Link to="/" >
                            <button className="Button" style={{marginRight:'10px', borderRadius: '30px', color: 'white' }}>Sign Up</button>
                    </Link>
                </div>
                )}

                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '100px',
                backgroundColor: '#cee7f1',

            }}>

                <div style={{ width: '500px', height: '500px', backgroundColor: '#ffffff', overflow: 'hidden', marginRight: '200px' }}>
                    <img
                        src={postData.imageArray}
                        alt={postData.name}
                        style={{ width: '100%', height: '100%' }}
                        onError={(e) => { e.target.src = 'https://i.ibb.co/HHgB7Cm/cafe-Image.webp'; }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <h2 style={{ margin: '10px 0', fontSize: '50px' }}>{postData.name}</h2>
                    <p style={{ margin: '5px 0', color: '#595959', fontSize: '25px' }}>Address: {postData.address}</p>
                    <p style={{ margin: '5px 0', fontSize: '18px', color: '#a3a2a2' }}>
                        Rating: {postData.rating}/10 Stars
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '18px', color: '#a3a2a2' }}>
                        Views: {postData.views} people
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '16px', color: 'black' }}>
                        Directions: {postData.directions}
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
