import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component {

    

    renderDish(dish) {
        if (dish != null) {
            return(        
                <Card>
                    <CardImg src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>                                    
                    </CardBody>
                </Card>
            
            ) 
        }
        else {
            return(
                <div></div>
            )
        }    
               
    }

    
    renderComments(dish) {
        
        
        if(dish != null) {

            
            const comments = dish.comments.map( dish => {
                
                return (
                    
                    <div key = {dish.id} >
                        
                        <ul className="list-unstyled">
                            <li>{dish.comment}</li>
                            <li>--{dish.author}, {new Date(dish.date).toString()}</li>
                            
                        </ul>
                    </div>
                )
            })
            return (            
                  <div>
                      <h4>Comments</h4>
                      {comments}
                  </div>
                )
        }

        else {
            return (
                <div></div>
            )
        }
        
        
    }
    
    
    render() {
        
        
        const {dish} = this.props;
        
                return(
                <div className="container">
                    <div className="row">      
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}        
                                            
                        </div>
                        <div className="col-12 col-md-4 m-1">
                        {this.renderComments(dish)}
                        </div>
                    </div>
                </div>                       
                )        
    }
        
}

export default DishDetail;

