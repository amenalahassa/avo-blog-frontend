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

export function showModal()
{
    $('.ui.modal').modal('show');
}
