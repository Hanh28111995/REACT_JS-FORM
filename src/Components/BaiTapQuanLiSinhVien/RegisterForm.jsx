import React, { Component, createRef } from 'react'
import { connect } from 'react-redux';

const DEFAULT_VALUE = {
  MaSV: '',
  HoTen: '',
  phoneNumber: '',
  email: '',
}

class RegisterForm extends Component {

  state = {
    values: DEFAULT_VALUE,
    errors: {
      MaSV: '',
      HoTen: '',
      phoneNumber: '',
      email: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.formRef.current.checkValidity()) {
      return;
    }
    this.props.dispatch({
      type: this.props.selectedUser ? "UPDATE_USER" : "ADD_USER",
      payload: this.state.values,
    });

    this.setState({
      values: DEFAULT_VALUE,
    },
      () => { this.forceUpdate(); }
    );
  }

  formRef = createRef();

  handleBlur = (event) => {
    const { name, title, minLength, maxLength, validity: { valueMissing, patternMismatch, tooLong, tooShort }, } = event.target;

    let message = "";
    if (valueMissing) {
      message = `Vui lòng nhập ${title}`;
    }
    if (patternMismatch) {
      message = `${title} không hợp lệ`;
    }
    if (tooLong || tooShort) {
      message = `${title} gồm ${minLength} đến ${maxLength} kí tự`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  }

  render() {
    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold">
          Thông tin sinh viên
        </div>
        <div className="card-body">
          <form noValidate ref={this.formRef} >
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input type="text" className="form-control" title='Mã SV' name='MaSV' required
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                  />
                  {
                    this.state.errors.MaSV && <span className='text-danger'>{this.state.errors.MaSV}</span>
                  }
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ Tên</label>
                  <input type="text" className="form-control" title='Họ Tên' name='HoTen' required
                  pattern= "[a-z]" 
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                  />
                  {
                    this.state.errors.HoTen && <span className='text-danger'>{this.state.errors.HoTen}</span>
                  }
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" className="form-control" title='Số điện thoại' name='phoneNumber' required
                    minLength={8} maxLength={12} pattern= "[0-9]" 
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                  />
                  {
                    this.state.errors.phoneNumber && <span className='text-danger'>{this.state.errors.phoneNumber}</span>
                  }
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" title='Email' name='email' required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$'
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                  />
                  {
                    this.state.errors.email && <span className='text-danger'>{this.state.errors.email}</span>
                  }
                </div>
              </div>
            </div>
            <div className=" text-muted">
              <button className="btn btn-success mr-2" onClick={(event) => this.handleSubmit(event)}>Thêm sinh viên</button>
            </div>
          </form>
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
export default connect(mapStateToProps)(RegisterForm);