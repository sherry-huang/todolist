import React, { Component } from 'react';
import photo from '../photo.jpg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './TodoList.module.scss';
import cx from 'classnames';
import { Form, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined, BorderOutlined } from '@ant-design/icons'; // LockOutlined
import { isEqual } from 'lodash';
import { actions, selectors } from '../redux/reducers/todoReducers';

const imgUrl = `https://fibo.dct-cloud.com/swift/v1/cece8dcd33544c20aa5bbfca84412a85-mt-jade-cloud-web/portal/order/other/user.png`;
const imgUrl2 = "https://fibo.dct-tb.mtjade.cloud/swift/v1/cbae0f5332c34ddab61d06fff56a449f-sherry-test/photo.jpg";
class TodoList extends Component {
    formRef = React.createRef();

    state = {
        feature: 'all', // all, done, archive
        tmpItem: '',
        data: [],
        archiveData: []
    }

    componentDidMount() {
        this.props.getTodoList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(!isEqual(prevState, this.state)) {
            this.formRef.current.setFieldsValue(this.state);
        }

        if(!isEqual(prevProps.todoList, this.props.todoList)) {
            this.setState({
                data: this.props.todoList
            })
        }
    }

    componentWillUnmount() {
        this.props.resetTodoList();
    }

    // type: undone, done, archive
    onChange = (value, key) => {
        this.setState({
            [key]: value
        })
    }

    onFinish = () => {
        const { tmpItem } = this.state;
        !!tmpItem && this.props.postTodoItem({
            content: tmpItem,
            done: false
        });
        this.setState({
            tmpItem: ""
        }, this.formRef.current.setFieldsValue(this.state));
    }

    handleAction = (action, data) => {
        console.log(data)
        switch (action) {
            case 'done':
                this.props.putTodoItem({
                    id: data.id,
                    done: !data.done
                })
                break;
            case 'delete':
                this.props.deleteTodoItem({
                    id: data.id,
                })
                break;
            default:
                break;
        }
    }

    renderBtn = (feature) => {
        const renderArr = [
            {
                key: 'all',
                text: '全部'
            }, {
                key: 'done',
                text: '已完成'
            }, {
                key: 'working',
                text: '未完成'
            }
        ];
        return (
            renderArr.map((item, idx) => (
                <button
                    key={idx}
                    className={cx({
                        [styles['btn']]: true,
                        [styles['check']]: (feature === item.key)
                    })}
                    onClick={() => this.onChange(item.key, 'feature')}
                >
                    {item.text}
                </button>
            ))
        )
    }

    renderList = (data, feature) => {
        switch (feature) {
            case 'all':
                return data && data.map((item) => (
                    this.renderLine(item)
                ))
            case 'done':
                return data.filter((item1) => (item1.done)).map((item) => (
                    this.renderLine(item)
                ))
            case 'working':
                return data.filter((item1) => !(item1.done)).map((item) => (
                    this.renderLine(item)
                ))
            default:
                // archive
                return data.map((item) => (
                    this.renderLine(item)
                ))
        }
    }

    renderLine = (item) => {
        return (
            <div
                key={item.id}
                className={styles['line-box']}
            >
                <div className={styles['left-line']}>
                    { item.done ?
                        <Button
                            type="text"
                            onClick={() => this.handleAction('done', item)}
                            icon={<CheckOutlined style={{fontSize: '20px', color:"#52c41a"}} />}
                        /> : <Button
                            type="text"
                            onClick={() => this.handleAction('done', item)}
                            icon={<BorderOutlined style={{fontSize: '20px'}} />}
                        />
                    }
                    <div className={cx({
                        [styles['line-word']]: true,
                        [styles['delete']]: (item.done)
                    })}>
                        {item.content}
                    </div>
                </div>
                <div>
                    <Button
                        type="text"
                        onClick={() => this.handleAction('delete', item)}
                        icon={<DeleteOutlined style={{fontSize: '20px'}} />}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { feature } = this.state;
        return (
            <div className={styles['todo-list']}>
                <div className={styles.container}>
                    <div className={styles['image-box']}>
                        <div className={styles.box}>
                            {/* <img src={imgUrl} className={styles.image} alt="logo" /> */}
                            <img src={imgUrl2} className={styles.image} alt="logo" />
                        </div>
                    </div>
                    <div className={styles['btn-line']}>{this.renderBtn(feature)}</div>
                    <div>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            initialValues={this.state}
                            className={styles['input-box']}
                        >
                            <Form.Item name="tmpItem">
                                <Input
                                    placeholder="請輸入代辦事項"
                                    value={this.state.tmpItem}
                                    onChange={(e) => this.onChange(e.target.value, 'tmpItem')}
                                    className={styles['text-input']}
                                    bordered={false}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="text"
                                    htmlType="submit"
                                    className={styles['btn-plus']}
                                    icon={<PlusOutlined style={{fontSize: '24px', color: '#7CC0E2'}}/>}
                                ></Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={styles['list-box']}>
                        {this.renderList(feature === "archive" ? this.state.archiveData : this.state.data, feature)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todoList: selectors.makeGetTodoList(state),
});

const mapDispatchToProps = {
    ...actions,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(TodoList);