import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import axios from 'axios';

const TableComponent = (props) => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [pageNum, setpageNum] = useState()
    const [nowPage, setNowPage] = useState(1)
    const [refreshTime ,setrefreshTime] = useState(1)

    useEffect(() => {
        axios.get(props.loadlink)
            .then(response => {
                setData(response.data);
                setrefreshTime(refreshTime + 1)
                console.log("rtEffect",refreshTime)
            })
            .catch(error => {
                console.error(error);
            });
    },[props.loadlink,refreshTime])

    useEffect(() => {
        axios.get('http://localhost:5000/get_todo_number')
            .then(response => {
                console.log(response.data);
                setpageNum(response.data);
            })
    })
    useEffect(() => {
        axios.get('http://localhost:5000/get_todo_image?number='+ nowPage)
            .then(response =>{
                setData(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [nowPage]);
    const handleRowSelection = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        console.log(selectedRowKeys);
    };

    const columns = [{
        title: '图片',
        dataIndex: 'pic',
        key: 'pic',
        render: (image) => (<img src={`data:image/jpeg;base64,${image}`} alt="图片" style={{width: '100px'}}/>),
    }, {
        title: 'uuid', dataIndex: 'key', key: 'key',
    }, {
        title: '上传日期', dataIndex: 'date', key: 'date',
    },];

    const rowSelection = {
        selectedRowKeys, onChange: handleRowSelection,
    };
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setNowPage(pageNumber)
    };

    const OnCropClick = () => {
        console.log(selectedRowKeys);
         axios.post('http://localhost:5000/quote_ocr', {uuids: selectedRowKeys})
             .then(response => {
                 if(response.status === 200){
                     console.log(response.data);
                     setrefreshTime(refreshTime + 1)

                 }
             })
             .catch(error => {
                 console.error(error);
             });
    }
    return (<div>
        <Table
            rowKey={(record) => record.key}
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={{
                defaultCurrent: 1, total: pageNum, showSizeChanger: false, onChange: onChange
            }}
        />
        <Button type="primary" onClick={OnCropClick}>无尽战神 出来！</Button>
    </div>);
};

export default TableComponent;
