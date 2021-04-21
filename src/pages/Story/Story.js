import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import { PRIORITY, STATUS } from './StoryConstants';
import Comments from '../../components/Comments/Comments';
import { Auth, Storage } from "aws-amplify";
import _ from 'lodash';
import Button from "react-bootstrap/Button";

import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../../graphql/queries";

class Story extends Component {

  currentUser = null;

  constructor(props) {
    super(props);
    this.state = {
      nestId: this.props.match.params.nestId,
      storyId: this.props.match.params.storyId,
      story: {
        title: "",
        status: "",
        comments: [],
        priority: "",
        effort: "",
        createdAt: "",  // Should be changed to dateCreated... do some parsing?
        description: "",
        attachments: null,
        owner: "", //Should be assignee... must be changed
        completionDate: "",
      },
    };

    this.currentUser = Auth.currentUserInfo().then(value => this.currentUser = value.username);
  }

  componentDidMount() {
    // get story info on page load
    API.graphql(
      graphqlOperation(queries.story, {
        nestId: this.state.nestId,
        storyId: this.state.storyId,
      })
    ).then((value) => {
      this.setState({ story: value.data.story });
      console.log('STORY IS: ', this.state.story);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row h-100 align-items-center">
          <div className="col-lg-12">
            <h1 className="display-6 text-black text-center nest-title">
              User Story: {this.state.story.title}
            </h1>
          </div>
        </div>

        <Form>
          <div className="left-container">
            <div className="row align-items-center pt-4">
              <Form.Group controlId="status">
                <Form.Label className="form-control-label">Status:</Form.Label>
                <Form.Control className="m-2" as="select" onChange={this.onChangeFieldState} value={this.state.story.status}>
                  {STATUS.values.map(value => (
                    <option>{value}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="date-created">
                <Form.Label className="form-control-label">Date Created:</Form.Label>
                <Form.Control className="m-2" type="input" value={this.state.story.createdAt} readOnly></Form.Control>
              </Form.Group>
            </div>

            {/* To be implemented epic linked with field... for now just a placeholder */}
            <Form.Group className="row align-items-center" controlId="epic-linked">
              <Form.Label className="form-control-label">Epic Linked With:</Form.Label>
              <Form.Control className="m-2" type="input" value={""} readOnly></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="form-control-label row">Description:</Form.Label>
              <Form.Control className="description-field-width-height row" as="textarea" value={this.state.story.description} onChange={this.onChangeFieldState}></Form.Control>
            </Form.Group>

            <Form.Group controlId="attachments">
              <Form.Label className="form-control-label row">Attachments:</Form.Label>
              <Form.Control className="file-field row" type="file" onChange={this.handleFileUpload}></Form.Control>
            </Form.Group>

            <Form.Group controlId="comments">
              <Comments onAddComment={this.handleAddComment} comments={this.state.story.comments}></Comments>
            </Form.Group>       
          </div>

          <div>
            <Form.Group className="pt-4" controlId="priority">
              <Form.Label className="form-control-label row">Priority:</Form.Label>
              <Form.Control as="select" onChange={this.onChangeFieldState} value={this.state.story.priority}>
                {PRIORITY.values.map(value => (
                  <option>{value}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="owner">
              <Form.Label className="form-control-label row">Assignee:</Form.Label>
              <Form.Control type="input" onChange={this.onChangeFieldState} value={this.state.story.owner}></Form.Control>
            </Form.Group>

            <Form.Group controlId="effort">
              <Form.Label className="form-control-label row">Effort:</Form.Label>
              <Form.Control type="input" onChange={this.onChangeFieldState} value={this.state.story.effort}></Form.Control>
            </Form.Group>

            <Form.Group controlId="completionDate">
              <Form.Label className="form-control-label row">To Be Completed By:</Form.Label>
              <Form.Control type="input" onChange={this.onChangeFieldState} value={this.state.story.completionDate}></Form.Control>
            </Form.Group>

            {/* This is just placeholder information until we get the gitHub hooks working... */}
            <Form.Group controlId="gitHub">
              <Form.Label className="form-control-label row">Code History:</Form.Label>
              <Form.Label className="row" type="input">{"1 Branch"}</Form.Label>
              <Form.Label className="row" type="input">{"3 Commits"}</Form.Label>
              <Form.Label className="row" type="input">{"1 Pull Request [Open]"}</Form.Label>
            </Form.Group>
          </div>

          <div className="center py-3">
            <Button variant="primary" className="mx-4 px-3">Finish</Button>
            <Button variant="secondary" className="mx-4 px-3">Discard</Button>  
          </div>  
          
        </Form>
      </React.Fragment>
    );
  }

  /**
   * Generically handles all changes for the form control values
   * @param event 
   */
  onChangeFieldState = (event) => {
    const fieldName = event.target.id;
    const value = event.target.value;

    const updatedPropertyObj = {};
    updatedPropertyObj[fieldName] = value;

    this.setState({story: {...this.state.story, ...updatedPropertyObj}})
  }

  handleAddComment = (data) => {

    const comments = _.cloneDeep(this.state.story.comments);
    
    const newCommentObj = {
      username: this.currentUser,
      content: "",
      createdAt: new Date(Date.now()).toLocaleString(),
      enabled: true,
    }
    
    comments.unshift(newCommentObj)
    
    this.setState({story: {...this.state.story, comments: comments}});
  }

  handleFileUpload = (data) => {
    // Storage.put();
  }

}

export default Story;
