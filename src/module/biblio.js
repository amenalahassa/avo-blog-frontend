import { DateTime } from "luxon"

import $ from './semantic'


export function formatDateInLocal(date){
    date = DateTime.fromISO(date)
    let f = {month: 'long', day: 'numeric', year: 'numeric'};
    return date.setLocale('fr').toLocaleString(f)
}

export function formatDateTimeInLocal(date){
    date = DateTime.fromISO(date)
    let f = {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    return date.setLocale('fr').toLocaleString(f)
}


export function initAccordion()
{
    $('.ui.accordion').accordion();
}

export function showConnectionModal()
{
    $('.ui.modal.connection').modal('show');
}

export function hideConnectionModal()
{
    $('.ui.modal.connection').modal('hide');
}

export function initFormValidation(type) {
    if (type === 'signup'){
        //eslint-disable-next-line
        const rule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $('.ui.form.signup').form({
            fields: {
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter your name'
                        }
                    ]
                },
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter your email'
                        },
                        {
                            type: 'regExp',
                            value: rule,
                            prompt : 'Please a valid email'
                        }]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a password'
                        },
                        {
                            type   : 'minLength[8]',
                            prompt : 'Your password must be at least {ruleValue} characters'
                        }
                    ]
                },
                confirmationpassword: {
                    identifier: 'confirmationpassword',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please confirm the password'
                        },
                        {
                            type   : 'match[password]',
                            prompt : 'Password Confirmation field is incorrect'
                        }
                    ]
                },
            }
        })
    }
}

export function checkFormValidation(type) {
    if (type === 'login')
    {
        return $('.ui.form.login').form('is valid')
    }
    else {
        return $('.ui.form.signup').form('is valid')
    }
}


export function resetConnectionForm(type) {
    if (type === 'login')
    {
        $('.ui.form.login').form('clear')
    }
    else {
        $('.ui.form.signup').form('clear')
    }
}


export function getUserFromLocal() {
    if(typeof localStorage!='undefined') {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export function saveUserInLocal(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
