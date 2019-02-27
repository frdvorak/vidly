import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' },
        errors: {}
    };
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };
    // result.error destructured to { error }
    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;

    };
    handleSubmit = e => {
        e.preventDefault(); // Prevent submiting event to the server which causes full page reload
        const errors = this.validate();
        // set errors to errors object or empty object, it can never be null
        this.setState({ errors: errors || {} });
        if (errors) return;
        // Call the server
        console.log('Submitted');
    }
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        Joi.validate()

    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    };
    render() {
        const { account, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={account.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;