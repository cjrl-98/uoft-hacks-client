import React from 'react';
import {ClothingCollectionContext} from '../../store/store';
import { Upload, Icon, Modal, Dropdown, Menu } from 'antd';

import app from '../../firebase/firebase';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.context[0]
  };
  static contextType = ClothingCollectionContext;

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList }); 
    this.context[1]( fileList )
  };

  handleBeforeUpload = file => {
    const storageRef = app.storage().ref().child(`${file.name}`);
    const reader = new FileReader();
    reader.onload = e => {
        console.log(e.target.result);
    };
    reader.readAsText(file);
    storageRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

   menu = (
      <Menu>
        <Menu.Item>
          <p onClick={ ()=>this.context[3]("Men") }>
            Men
          </p>
        </Menu.Item>
        <Menu.Item>
          <p onClick={ ()=>this.context[3]("Women") }>
            Women
          </p>
        </Menu.Item>
      </Menu>
  );

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log(this.context[2]);
    return (
      <div className="clearfix">
        <h1 style={{fontSize: "40px", fontWeight: 700, marginBottom: "24px"}}>Collection</h1>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.handleBeforeUpload}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Dropdown overlay={this.menu}>
          <p>
            Sex : {this.context[2] ? this.context[2] : "N/A"} <Icon type="down" />
          </p>
        </Dropdown>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%', height: '500px' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
