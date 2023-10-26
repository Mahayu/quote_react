import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import axios from 'axios';

const TableComponent = (props) => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        axios.get(props.loadlink)
            .then(response => {
                setData(response.data.images);
                console.log(response.data.images);
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.loadlink]);

    const handleRowSelection = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        console.log(selectedRowKeys);
    };

    const columns = [
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img src={`data:image/jpeg;base64,${image}`} alt="图片" style={{width: '100px'}}/>
            ),
        },
        {
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid',
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
            />
            <Button type="primary" onClick={OnCropClick}>裁剪</Button>
        </div>
    );
};

export default TableComponent;
