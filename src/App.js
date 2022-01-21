import React , {useState , useEffect } from 'react';
import './App.css';
import { db , auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Post from './Post';
import { Button , Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return { 
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts , setPosts] = useState([]);
  const [open , setOpen] = useState(false);
  const [openSignIn , setOpenSignIn] = useState(false);
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [user , setUser] = useState(null)


    // {
    // username:"Louie",
    //  caption:"Beautiful Image",
    //   imageUrl:"https://static.toiimg.com/thumb/msid-58475411,width-748,height-499,resizemode=4,imgsize-142947/.jpg"
    // },
    // {
    //   username:"Louie",
    //  caption:"Beautiful Image",
    //   imageUrl:"https://static.toiimg.com/thumb/msid-58475411,width-748,height-499,resizemode=4,imgsize-142947/.jpg"
    // }
    
    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
          // user has logged in ....
          console.log(authUser);
          setUser(authUser);

         
        
        } else {
          // user has logged out...
          setUser(null);
        }
      })
       
      return() => {
        // perform  some cleanup action
        unsubscribe();
      }

    }, [user , username]);
  // useEffect - runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts'). orderBy('timestamp' , 'desc').onSnapshot((snapshot) => {
      // everytime a new post is added , this codes fires up
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id ,  
        post: doc.data()
      })));
    })
    
 },  []);
 
 const signUp = (event) => {
   event.preventDefault();
   auth
   .createUserWithEmailAndPassword(email , password)
   .then((authUser) => {
    return  authUser.user.updateProfile({
       displayName: username
     })
   })
   .catch((error) => alert(error.message));
   setOpen(false);
   

 }

 const signIn = (event) => {
   event.preventDefault();
   auth
   .signInWithEmailAndPassword(email , password)
   .catch((error) => alert(error.message))
   setOpenSignIn(false);
 }



  return (
    <div className="App">
      
     
       <Modal
        open={open}
        onClose={() => setOpen(false)}
       
      >
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
    <center>
          <img className="app__headerimage" alt="abc" src="https://1000logos.net/wp-content/uploads/2017/02/Emblem-Instagram-500x500.jpg"></img>
          </center>

          <Input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
            </div>
             </Modal>

             <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signup">
        <center>
          <img className="app__headerimage" alt="abc" src="https://1000logos.net/wp-content/uploads/2017/02/Emblem-Instagram-500x500.jpg"></img>
         </center>
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"   onClick={signIn}>Sign In</Button>
        
          </form>
        </div>
      
      </Modal>


      <div className="app__header">
      <img className="app__headerimage" alt="abc" src="http://cdn.timesofisrael.com/images/instagram-logo.png"></img>
      {user ? (
          <Button onClick={() => auth.signOut()}> Logout</Button>
      ):(
        <div className = "app__loginContainer">
       
        <Button onClick ={()=>setOpenSignIn(true)}>Sign In</Button>
        <Button onClick ={()=>setOpen(true)}>Sign Up</Button>
        </div>

      )}
      
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
        {
          posts.map(({id ,post}) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
          ))
        }


        </div>
        
      <div className="app__postRight">
      <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>

      </div>
       </div>
    
     


        {/* <Post username="Louie" caption="Beautiful Image" imageUrl="https://static.toiimg.com/thumb/msid-58475411,width-748,height-499,resizemode=4,imgsize-142947/.jpg" />
        <Post username="Betty" caption="Chilling" imageUrl="https://thumbs.dreamstime.com/b/young-fit-man-chilling-beach-handsome-athletic-muscled-body-chair-summer-55072902.jpg" />
        <Post username="Pete" caption="Snacking" />
        
         */}
          {user?.displayName ? (
         <ImageUpload username={user.displayName} />
      ): (
        <h3> Sorry you need to login to upload</h3>
        )}
    
      
    </div>
  );
}

export default App;


//  https://instagram-clone-react-358b5.web.app