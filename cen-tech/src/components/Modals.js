import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Input, Col, FormGroup, FormFeedback, Label
} from 'reactstrap';
import axios from 'axios';
const AddContactForm = (props) => {
    const {
        buttonLabel,
        className
    } = props;


    const [modal, setModal] = useState(false);
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const handleFirstNameInput = e => {
        setFirstname(e.target.value);
    };
    const handleLastNameInput = e => {
        setLastname(e.target.value);
    };
    const handlePhoneNumberInput = e => {
        setPhoneNumber(e.target.value);
    };
    const handleEmailInput = e => {
        setEmail(e.target.value);
    };
    const handleBirthdayInput = e => {
        setBirthday(e.target.value);
    };

    const toggle = () => setModal(!modal);


    const clearFields = () => {
        setFirstname('')
        setLastname('')
        setPhoneNumber('')
        setEmail('')
        setBirthday('')
    }
    const cancel = () => {
        toggle()
        clearFields()
    }
    const addContact = () => {
        console.log(birthday)
        console.log(firstName)
        console.log(phoneNumber)
        axios.post("functions/addContact", {
            fName: firstName,
            lName: lastName,
            phoneNum: phoneNumber,
            email: email,
            birthday: birthday
        })
            .then(res => {
                console.log(res.data)
            });
        toggle()
        clearFields()
    }

    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={cancel}>&times;</button>;
    return (
        <div>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} external={externalCloseBtn}>
                <ModalHeader>Add Contact</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup row>
                            <Label for="firstName" sm={3}>First Name</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="text"
                                    name="firstName"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={handleFirstNameInput}
                                    maxLength='15'
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName" sm={3}>Last Name</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="text"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={handleLastNameInput}
                                    maxLength='15'
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="phoneNumber" sm={3}>Phone</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="tel"
                                    name="phoneNumber"
                                    placeholder="4065554123"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberInput}
                                    maxLength='15'
                                    minLength='5'
                                    // valid={this.state.usernameValid === 'valid'}
                                    // invalid={this.state.usernameValid === 'invalid'}
                                    required
                                />
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Email" sm={3}>Email</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="email"
                                    name="Email"
                                    placeholder="Example@example.com"
                                    value={email}
                                    onChange={handleEmailInput}
                                    maxLength='40'
                                    minLength='5'
                                // valid={this.state.usernameValid === 'valid'}
                                />
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="birthday" sm={3}>Birthday</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="date"
                                    name="birthday"
                                    value={birthday}
                                    onChange={handleBirthdayInput}
                                // valid={this.state.usernameValid === 'valid'}
                                // invalid={this.state.usernameValid === 'invalid'}
                                />
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addContact}>Add contact</Button>{' '}
                    <Button color="secondary" onClick={cancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


const ModalEdit = (props) => {
    const {
        buttonLabel,
        className,
        firstN,
        lastN,
        phoneN,
        emailProp,
        birthdayProp,
        id
    } = props;

    const [modal, setModal] = useState(false);
    const [firstName, setFirstname] = useState(firstN)
    const [lastName, setLastname] = useState(lastN)
    const [phoneNumber, setPhoneNumber] = useState(phoneN)
    const [email, setEmail] = useState(emailProp)
    const [birthday, setBirthday] = useState(birthdayProp)
    const handleFirstNameInput = e => {
        setFirstname(e.target.value);
    };
    const handleLastNameInput = e => {
        setLastname(e.target.value);
    };
    const handlePhoneNumberInput = e => {
        setPhoneNumber(e.target.value);
    };
    const handleEmailInput = e => {
        setEmail(e.target.value);
    };
    const handleBirthdayInput = e => {
        setBirthday(e.target.value);
    };

    const toggle = () => setModal(!modal);
    const submitEdit = () => {
        axios.put('functions/updateContact', {
            body: {
                id: id,
                fName: firstName,
                lName: lastName,
                phoneNum: phoneNumber,
                email: email,
                birthday: birthday
            }
        })
            .then(res => {
                console.log(res.data)
            });
            toggle()
    }

    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
        <div>
            <Button color="warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} external={externalCloseBtn}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup row>
                            <Label for="firstName" sm={3}>First Name</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="text"
                                    name="firstName"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={handleFirstNameInput}
                                    maxLength='15'
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName" sm={3}>Last Name</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="text"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={handleLastNameInput}
                                    maxLength='15'
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="phoneNumber" sm={3}>Phone</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="tel"
                                    name="phoneNumber"
                                    placeholder="4065554123"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberInput}
                                    maxLength='15'
                                    minLength='5'
                                    // valid={this.state.usernameValid === 'valid'}
                                    // invalid={this.state.usernameValid === 'invalid'}
                                    required
                                />
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Email" sm={3}>Email</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="email"
                                    name="Email"
                                    placeholder="Example@example.com"
                                    value={email}
                                    onChange={handleEmailInput}
                                    maxLength='40'
                                    minLength='5'
                                // valid={this.state.usernameValid === 'valid'}
                                // invalid={this.state.usernameValid === 'invalid'}
                                />
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="birthday" sm={3}>Birthday</Label>
                            <Col sm={9} className="mr-auto ml-auto">
                                <Input type="date"
                                    name="birthday"
                                    value={birthday}
                                    onChange={handleBirthdayInput}
                                // valid={this.state.usernameValid === 'valid'}
                                // invalid={this.state.usernameValid === 'invalid'}
                                />
                                <FormFeedback valid>Sweet! that name is available</FormFeedback>
                                <FormFeedback invalid>That name is unavailable :(</FormFeedback>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitEdit}>Make Changes</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export { AddContactForm, ModalEdit }
