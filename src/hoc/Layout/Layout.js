import React,{Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary'
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class layout extends Component {

    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler=(props)=>{

        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler=(props)=>{
        this.setState((prevState)=>
        {
            return {showSideDrawer: !prevState.showSideDrawer}})
    }

    render()
    {
       return (
 
        <Auxiliary>
           <Toolbar clicked={this.sideDrawerToggleHandler}/>
         <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        
    );
      
    }
} ;  
export default layout;