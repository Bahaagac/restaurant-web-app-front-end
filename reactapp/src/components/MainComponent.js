import React, {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import DishDetail from './DishDetailComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions} from 'react-redux-form';

const mapStateToProps = state => {
    return {
      dishes : state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  addComment : (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  resetFeedbackForm : () => { dispatch(actions.reset('feedback'))}
})
class Main extends Component {

  
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }


  render() {
    
          const DishWithId = ({match}) => {
            return (
              <DishDetail 
              dish={this.props.dishes.dishes.filter((dish) => dish.id ===parseInt(match.params.dishId,10))[0]}
              dishesLoading= { this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}

              comments = {this.props.comments.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId,10))}
              commentsErrMess = {this.props.comments.errMess} 

              addComment={this.props.addComment}/>
            );
          }

          return (
            <div>
              <Header/>
              <Switch>
                <Route path="/home" component = {() => <Home 
                  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                  dishesLoading= {this.props.dishes.isLoading}
                  dishesErrMess = {this.props.dishes.errMess} 
                  
                  promoLoading= {this.props.promotions.isLoading}
                  promoErrMess = {this.props.promotions.errMess} 
                  promotion= {this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
                  leader= {this.props.leaders.filter((leader) => leader.featured)[0]} 
                  /> } />
                  
                <Route path="/aboutus" component = {() => <About leaders = {this.props.leaders} />} />

                <Route exact path="/menu" component = {() => <Menu dishes= {this.props.dishes}/>} />
                <Route path="/menu/:dishId" component = {DishWithId} />
                <Route exact path="/contactus" component = {() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>} />
                <Redirect to ="/home" />n
              </Switch>              
              <Footer/>
            </div>
          );
        }
      }

      export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));