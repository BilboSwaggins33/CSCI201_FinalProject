import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate,useParams } from 'react-router-dom';

const Post = () => {
    const navigate = useNavigate(); 
    let { postID } = useParams();

    const [postData, setPostData] = useState([]);


    useEffect(() => {
        // if (!userId) {
        //   console.error("No userId found in localStorage. Redirect to sign-in page.");
        //   return;
        // }
        // let thePost;
    
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
    // const fetchPosts = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/post/${postID}'
    //     });
  
    //     const data = await response.json();
  
    //     if (response.ok) {
    //       thePost = data;
    //     } 
    //   } catch (error) {
    //     console.error('Error during getting post:', error);
    //     setErrorMessage('Error.');
    //   }
    // };
     
    
        // Hardcoded test data
        const thePost = 
          {
            PostID: 5,
            Name: "Stagger Coffee",
            Address: "1438 8th St, Los Angeles, USA",
            Rating: 4.6,
            Description: "Delicious lattes and friendly staff. Must get Matcha ",
            Views: 1000,
            ImageArray: "https://i.ibb.co/HHgB7Cm/cafe-Image.webp",
            Time: "2024-11-08 09:30:34",
            Ambiance: "Very good studyvibes",
          }
        ;
        setPostData(thePost);
      }, []);

      function signOut() {

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
                            <button className="Button" style={{marginRight:'10px'}}>Post Spot</button>
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
                    src={postData.ImageArray} 
                    alt={postData.Name} 
                    style={{ width: '100%' , height: '100%' }} 
                />
                </div>

                <div style={{
                display : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                            <h2 style={{ margin: '10px 0' , fontSize: '50px'}}>{postData.Name}</h2>
                    <p style={{ margin: '5px 0', color: '#595959' , fontSize: '25px'}}>Address: {postData.Address}</p>
                    <p style={{ margin: '5px 0', fontSize: '18px' ,color: '#a3a2a2'}}>
                        Rating: {postData.Rating}/5 Stars
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '18px', color: '#a3a2a2' }}>
                        Views: {postData.Views} people
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '16px', color: 'black' }}>
                        Description: {postData.Description}
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '16px', color: 'black' }}>
                        Ambience: {postData.Ambiance}
                    </p>



                </div>
            </div>
        </div>
      );
};
export default Post;
