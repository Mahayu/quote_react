import {InboxOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import axios from 'axios';
import './upload_form.css';
import Picselect from "../picselect";

const {Dragger} = Upload;

const UploadForm = () => {
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('files', file);
        try {
            const response = await axios.post('http://localhost:5000/quote_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // 根据接口返回的响应进行处理
            if (response.data.status === "success") {
                message.success(`${file.name} file uploaded successfully.`);
            } else {
                message.error(`${file.name} file upload failed.`);
            }
        } catch (error) {
            message.error(`${file.name} file upload failed.`);
        }
    };

    const props = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        beforeUpload: handleUpload,
    };

    return (
        <div className="upload">
            <div className="upload-box">
                <Dragger {...props} style={{
                     display: "flex",
                     alignItems : "center"
                }}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text"> 点一下上传语录捏 </p>
                </Dragger>
            </div>
            <div className="form-ready">
                <Picselect loadlink={'http://localhost:5000/get_todo_image'}/>
            </div>
        </div>
    );
};

export default UploadForm;
