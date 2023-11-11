import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import axios from 'axios';

const TableComponent = (props) => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [pageNum,setpageNum] = useState()

    useEffect(() => {
        axios.get(props.loadlink)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.loadlink]);
    useEffect(()=>{
        axios.get('http://localhost:5000/get_todo_number')
            .then(response=>{
                console.log(response.data);
                setpageNum(response.data);
            })
    })
    const handleRowSelection = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        console.log(selectedRowKeys);
    };

    const columns = [
        {
            title: '图片',
            dataIndex: 'pic',
            key: 'pic',
            render: (image) => (
                <img src={`data:image/jpeg;base64,${image}`} alt="图片" style={{width: '100px'}}/>
            ),
        },
        {
            title: 'uuid',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '上传日期',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: handleRowSelection,
    };

    const OnCropClick = () => {
        console.log(selectedRowKeys);
        // axios.post('http://localhost:5000/api/crop', {uuids: selectedRowKeys})
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    }
    return (
        <div>
            <Table
                rowKey={(record) => record.uuid}
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
                pagination={{
                    defaultCurrent: 1,
                    total:pageNum,
                    showSizeChanger: false
                }}
            />
            <Button type="primary" onClick={OnCropClick}>裁剪</Button>
        </div>
    );
};

export default TableComponent;
