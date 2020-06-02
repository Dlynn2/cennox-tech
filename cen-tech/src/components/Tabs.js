import React, { useState, useEffect, useRef } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ModalTest } from './Modals';
import axios from 'axios';
import Table from './Table'
const Tab = (props) => {
    const {
        rows,
    } = props;

    const [activeTab, setActiveTab] = useState('1');
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
        // console.log(tab)
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(axios.get('functions/getContacts', {
                    params: {
                        tableName: tab
                    }
                })
                    .then(res => {
                        return res;
                    }));
            }, 100)
        }).then((result) => {
            setData(result.data);
            console.log(result.data)
            if (result.data.length > 0) {
                setHeaders(Object.keys(result.data[0]));
            }
            console.log(result)
        })
    }

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(axios.get('functions/getContacts', {
                        params: {
                            tableName: activeTab
                        }
                    })
                        .then(res => {
                            return res;
                        }));
                }, 1000)
            }).then((result) => {
                setData(result.data);
                if (result.data.length > 0) {
                    setHeaders(Object.keys(result.data[0]));
                }
                console.log(result)
            })
        }
    },[] );

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Contacts
          </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Coworkers
          </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Friends
          </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <Table headers={headers} rows={data} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <Table headers={headers} rows={data} tableName={activeTab} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <Table headers={headers} rows={data} tableName={activeTab} />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tab;