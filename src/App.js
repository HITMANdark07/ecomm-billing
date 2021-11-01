import React, { useEffect } from 'react';
import {Switch , Route} from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import SignInSide from './pages/Signin';
import SignUpSide from './pages/Signup';
import {auth, fs} from "./firebase/index";
import { setCurrentUser } from "./redux/user/user.action";
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ManageCategory from './pages/ManageCategory';
import ManageProducts from './pages/ManageProducts';
import ManageProduct from './pages/ManageProduct';
import ManageOrder from './pages/ManageOrder';
import ManageAgents from './pages/ManageAgents';
import SalesReport from './pages/SalesReport';
import Bill from './pages/Bill';
import makeToast from './Toaster';

function App(props) {
  const setUser = props.setCurerntUser;
  const currentUsr = props.currentUser;

  useEffect(() =>{
    let subs;
    if(!currentUsr){
      subs = auth.onAuthStateChanged(user => {
        if(user){
          fs.collection("users").doc(user.uid).get().then(async snapshot => {
            var role = await snapshot.data() && snapshot.data().role;
            if(role!=="user"){
              setUser({...snapshot.data(),id:snapshot.id});
            }else{
              auth.signOut().then(()=>{
                setUser(null);
                makeToast("warning", "Contact Admin to Login")
            })
            }
          })
        }
      })
    }
    if(currentUsr && currentUsr.role==="user"){
          auth.signOut().then(()=>{
            setUser(null);
            makeToast("warning", "Contact Admin to Login")
        })
    }

    return () => subs;
  },[currentUsr,setUser]);
  return (
      <Switch>
        <Route exact path="/" component={SignInSide} />
        <Route exact path="/signup" component={SignUpSide} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/agents" component={ManageAgents} />
        <Route exact path="/reports" component={SalesReport} />
        <Route exact path="/manage-category" component={ManageCategory} />
        <Route exact path="/manage-products" component={ManageProducts} />
        <Route exact path="/manage-products/:productID" component={ManageProduct} />
        <Route exact path="/manage-orders" component={ManageOrder} />
        <Route exact path="/bill/:billID" component={Bill} />
      </Switch>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setCurerntUser : user => dispatch(setCurrentUser(user))
})
const mapStateToProps = (state) => ({
  currentUser : state.user.currentUser
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
