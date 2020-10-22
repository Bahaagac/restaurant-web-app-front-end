import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';





    function RenderDish({dish}) {

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

    
    function RenderComments({dish}) {
        
        
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
    
    
    const DishDetail =(props) => {
        
        
        const {dish} = props;
        
                return(
                <div className="container">
                    <div className="row">      
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish= {props.dish}/>        
                                            
                        </div>
                        <div className="col-12 col-md-4 m-1">
                            <RenderComments dish= {props.dish}/>
                        </div>
                    </div>
                </div>                       
                )        
    }
        


export default DishDetail;

