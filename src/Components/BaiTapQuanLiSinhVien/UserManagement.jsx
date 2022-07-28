import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteUserAction, SetUserAction } from '../../Store/actions/user';

class UserManagement extends Component {
  state = {
    keyword: '',
  }
  renderUserList = () => {

    let data = this.props.userList.filter((ele) => {
      return (ele.HoTen.toLowerCase().trim().indexOf(this.state.keyword.toLowerCase().trim()) !== -1)
    });

    return data.map((ele, idx) => {
      const {id,MaSV,HoTen,phoneNumber,email} = ele;

      return (
        <tr key={id} className={`${idx % 2 === 0 && "bg-light"}`}>
          <td>{MaSV}</td>
          <td>{HoTen}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td>
            <button
              onClick={() =>
                this.props.dispatch(SetUserAction(ele))
              }
              className="btn btn-info mr-2"
            >
              EDIT
            </button>
            <button
              onClick={() =>
                this.props.dispatch(deleteUserAction(ele))
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
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value,
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
                placeholder="Search by name..."
                className="form-control"
                name="keyword"
                onChange={this.handleChange}
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

