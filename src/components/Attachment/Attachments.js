import React, { Component } from 'react';
import Attachment from './Attachment';
import { Form } from 'react-bootstrap';
import { ulid } from 'ulid'
import { Storage } from "aws-amplify";

class Attachments extends Component {

  render() { 
    return ( 
      <React.Fragment>
        <Form.Label className="form-control-label row">Attachments:</Form.Label>
        <div className='attachments-container'>
          {this.props.attachments.map(attachment => (
            <Attachment attachment={attachment} getFile={this.getFileFromS3Bucket}></Attachment>
          ))}
        </div>
        <br />
        <Form.File className="file-field row" id='file-input' label='Upload a File' onChange={this.uploadFileToS3Bucket} custom></Form.File>
      </React.Fragment>    
     );
  }

  uploadFileToS3Bucket = (event) => {
    const file = event.target.files[0];

    if(!file) {
      return;
    }

    const fileType = file.type;
    const extensionType = this.getFileExtension(file.name);

    const id = `${ulid()}${extensionType}`;
    Storage.put(id, file, {
        level: 'protected',
        contentType: fileType,
      })
      .then(value => {
        this.props.saveFile(value.key, file.name);
    })
    .catch(error => {
      console.error("Error while uploading file to S3 bucket: ", error);
      alert('An error occurred while uploading the file. Please try again.');
    });
  }

  getFileFromS3Bucket = (attachment) => {
    Storage.get(attachment.key, { level: 'protected', download: true})
      .then(file => this.downloadBlob(file.Body, attachment.name));
  }

  /**
   * Simulates the download process for a user
   * @param {*} blob 
   * @param {*} filename 
   * @returns 
   */
  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename || 'download';
    
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener('click', clickHandler);
      }, 150);
    };
    
    a.addEventListener('click', clickHandler, false);
    a.click();
    
    return a;
  }

  getFileExtension(fileName) {
    const beginningIndex = fileName.lastIndexOf('.');
    return fileName.substr(beginningIndex);
  }

}
 
export default Attachments;
