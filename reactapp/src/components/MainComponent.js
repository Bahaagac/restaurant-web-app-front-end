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
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
    return {
      dishes : state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  postFeedback : (firstname, lastname, telnum,email,agree,ContactType,message) => dispatch(postFeedback(firstname, lastname, telnum,email,agree,ContactType,message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm : () => { dispatch(actions.reset('feedback'))}
})
class Main extends Component {

  
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

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

              postComment={this.props.postComment}/>
            );
          }

          return (
            <div>
              <Header/>
              <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                  <Switch location={this.props.location}>
                    <Route path="/home" component = {() => <Home 
                      dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading= {this.props.dishes.isLoading}
                      dishesErrMess = {this.props.dishes.errMess} 
                      
                      promoLoading= {this.props.promotions.isLoading}
                      promoErrMess = {this.props.promotions.errMess} 
                      promotion= {this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 

                      leadersLoading = {this.props.leaders.isLoading}
                      leadersErrMess = {this.props.leaders.errMess}
                      leader= {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                      
 
                      /> } />
                      
                    <Route path="/aboutus" component = {() => <About 
                      leadersLoading = {this.props.leaders.isLoading}
                      leadersErrMess = {this.props.leaders.errMess}
                      leaders = {this.props.leaders.leaders}
 
                    />} />

                    <Route exact path="/menu" component = {() => <Menu dishes= {this.props.dishes}/>} />
                    <Route path="/menu/:dishId" component = {DishWithId} />
                    <Route exact path="/contactus" component = {() => <Contact 
                    resetFeedbackForm = {this.props.resetFeedbackForm}
                    postFeedback = {this.props.postFeedback} />} />
                    <Redirect to ="/home" />n
                  </Switch>
                </CSSTransition>
              </TransitionGroup>            
              <Footer/>
            </div>
          );
        }
      }

      export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));