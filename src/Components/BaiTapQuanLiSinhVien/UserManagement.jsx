import React, { Component } from 'react';
import { connect } from "react-redux";

class UserManagement extends Component {
  renderUserList = () => {
    return this.props.userList.map((ele, idx) => {
      const {
        MaSV,
        HoTen,
        phoneNumber,
        email,
    } = ele ;
    return (
      <tr key={idx} className={`${idx % 2 === 0 && "bg-light"}`}>
          <td>{MaSV}</td>
          <td>{HoTen}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td>
            <button
              onClick={() =>
                this.props.dispatch({
                  type: "SET_SELECTED_USER",
                  payload: ele,
                })
              }
              className="btn btn-info mr-2"
            >
              EDIT
            </button>
            <button
              onClick={() =>
                this.props.dispatch({
                  type: "DELETE_USER",
                  payload: ele,
                })
              }
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
    )
  })

}
render() {
  return (
    <div className="card p-0 mt-3">
      <div className="row mt-4 px-3 ">
        <div className="col-4">
          <div className="form-group mb-0">
            <input
              type="text"
              placeholder="Search by full name..."
              className="form-control"
            />
          </div>
        </div>

      </div>
      <div className="card-body ">
        <table className="table">
          <thead className='bg-dark  text-white'>
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderUserList()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  };
};
export default connect(mapStateToProps)(UserManagement);

