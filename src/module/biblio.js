import { DateTime } from "luxon"

export function formatDateInLocal(date){
    date = DateTime.fromISO(date)
    let f = {month: 'long', day: 'numeric', year: 'numeric'};
    return date.setLocale('fr').toLocaleString(f)
}