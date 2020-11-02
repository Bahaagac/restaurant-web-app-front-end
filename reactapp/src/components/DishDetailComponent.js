import React, {Component} from 'react';
import { Loading } from './LoadingComponent';

import {Card, CardImg, CardText, CardBody, CardTitle, CardImgOverlay,
    Breadcrumb, BreadcrumbItem, Button, Label,
    Modal, ModalHeader, ModalBody,Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components'
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val &&  (val.length >= len);

    class CommentForm extends Component {

        constructor(props) {
            super(props);
            
            this.state = {
                isModalOpen: false
            };
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            
        }

        handleSubmit(values) {
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
            this.toggleModal();

            
        }

        toggleModal() {
            this.setState({
                isModalOpen : !this.state.isModalOpen
            })
        }

        
        render() {
            return (
                <>
                <Fade in>
                <Button  onClick={this.toggleModal} type="button"  outline color="secondary">
                    <span className="fa fa-pencil"  aria-hidden="true" color="secondary"> Submit Comment</span>
                
                </Button>
                </Fade>
                <Modal isOpen= {this.state.isModalOpen} toggle= {this.toggleModal}>
                <ModalHeader toggle= {this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                            <LocalForm onSubmit ={(values) => (this.handleSubmit(values))}>
                            <Row className="form-group"> 
                                <Label htmlFor="rating" md={2}>Rating</Label>                                                               
                                    <Col md={10}>
                                        <Control.select model=".rating"
                                        name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>                                        
                                        </Control.select>                                    
                                    </Col>                               
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" 
                                        id="comment" 
                                        name="comment"
                                        className="form-control" 
                                        rows="12"
                                    ></Control.textarea>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size :10, offset :2}}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            </>
            )
        }
    }

    function RenderDish({dish,favorite, postFavorite}) {

        if (dish != null) {
            return( 
                <FadeTransform
             in 
            transformProps={{
                exitTransform : 'scale(0.5) translateY(-50%)'
            }}>       
                    <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                            {favorite ?
                                <span className="fa fa-heart"></span>
                                : 
                                <span className="fa fa-heart-o"></span>
                            }
                        </Button>
                    </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>                                                          
                        </CardBody>
                    </Card>
                </FadeTransform>
            
            ) 
        }
        else {
            return(
                <div></div>
            )
        }    
               
    }

    
    function RenderComments({comments, postComment, dishId }) {
        
        
        if(comments != null) {

            return(
                <>
            <Fade in>
                <h4>Comments</h4>
            </Fade>
            <ul className="list-unstyled">
                <Stagger in>
                {comments.map((comment) => {
                
                return (
                <Fade in key={comment._id} >
                    <li>
                        <p>{comment.comment}</p>
                        <p>{comment.rating}</p>
                        <p>-- {comment.author.firstname} {comment.author.lastname}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                    </Fade>
                )
            })}
                </Stagger>
            </ul>
            <CommentForm dishId = {dishId} postComment = {postComment}/>
            </>
            )
        }

        else {
            return (
                <div></div>
            )
        }
        
        
    }
    
    
    const DishDetail =(props) => {
            
        if (props.dishesLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if (props.dishesErrMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

            else if (props.dish != null) {
                return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        
                        <div className="col-12">
                                <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">      
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish= {props.dish} favorite={props.favorite} postFavorite={props.postFavorite}/>        
                                            
                        </div>
                        <div className="col-12 col-md-4 m-1">
                            <RenderComments comments= {props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                        </div>
                    </div>
                </div>                       
                )
            }
            else {
                return (
                    <div></div>
                )
            }        
    }
        


export default DishDetail;

