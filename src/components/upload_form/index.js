import {InboxOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import axios from 'axios';
import './upload_form.css';
import Picselect from "../picselect";

const {Dragger} = Upload;

const UploadForm = () => {
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload_cut', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 根据接口返回的响应进行处理
            if (response.data.success) {
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
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </div>
            <div className="upload-box">
                <Picselect loadlink={'http://localhost:5000/api/images'}/>
            </div>
        </div>
    );
};

export default UploadForm;
