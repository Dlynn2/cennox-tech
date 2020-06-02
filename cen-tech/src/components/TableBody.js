import React from 'react';
import { Spinner, Button } from 'reactstrap';
import { ModalEdit } from './Modals';
import axios from 'axios';

const TableBody = (props) => {
  const { rows, tableName } = props;
  const columns = rows ? rows.length : 0;
  const showSpinner = rows === null;

  const deleteContact = (id) => {
    axios.delete('functions/deleteContact', {
      params: {
        id: id
      }
    })
      .then(res => {
        console.log(res.data)
      });
  }
  function getRenderFunction(tableName, rows) {
    console.log(tableName.tableName)
    switch (tableName.tableName) {
      case '3':
        return renderFriendData(rows);
        break;
      case '2':
        return renderCoworkerData(rows);
        break;
      default:
        return renderContactData(rows)
    }
  }
  function renderContactData(rows) {
    const { fName, id, lName, phoneNum } = rows //destructuring
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{fName}</td>
        <td>{lName}</td>
        <td>{phoneNum}</td>
        <td><ModalEdit buttonLabel="Edit" id = {id} firstN={fName} lastN={lName} phoneN={phoneNum} emailProp='' birthdayProp= ''
          onClick={() => ModalEdit}></ModalEdit></td>
        <td><Button color="danger" onClick={() => deleteContact(id)}>Delete</Button></td>
      </tr>
    )
  }
  function renderCoworkerData(rows) {
    const { fName, id, lName, phoneNum, email } = rows //destructuring
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{fName}</td>
        <td>{lName}</td>
        <td>{phoneNum}</td>
        <td>{email}</td>
        <td><ModalEdit buttonLabel="Edit" id = {id} firstN={fName} lastN={lName} phoneN={phoneNum} emailProp={email}emailProp={email} birthdayProp=''
          onClick={() => ModalEdit}></ModalEdit></td>
        <td><Button color="danger" onClick={() => deleteContact(id)}>Delete</Button></td>
      </tr>
    )
  }
  function renderFriendData(rows) {
    const { fName, id, lName, phoneNum, email, birthday } = rows //destructuring
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{fName}</td>
        <td>{lName}</td>
        <td>{phoneNum}</td>
        <td>{email}</td>
        <td>{birthday}</td>
        <td><ModalEdit buttonLabel="Edit" id = {id} firstN={fName} lastN={lName} phoneN={phoneNum} emailProp={email} birthdayProp={birthday}
          onClick={() => ModalEdit}></ModalEdit></td>
        <td><Button color="danger" onClick={() => deleteContact(id)}>Delete</Button></td>
      </tr>
    )
  }
  return (
    <tbody>
      {showSpinner &&
        <tr>
          <td colSpan={columns} className="text-center">
            <div>
              <Spinner color="info" />
            </div>
          </td>
        </tr>
      }
      {!showSpinner && rows && rows.map((value) => {
        return getRenderFunction({tableName},value);
      })}
    </tbody>
  );
}

export default TableBody;