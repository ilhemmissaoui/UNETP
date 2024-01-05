import { useContext } from 'react';

import { ToastContext } from '../lib/toast';

/**
 *
 * @returns {{setToast:function({message:String,variant:('success'|'danger'|'warning')})}}
 */
export default function useToast() {
    const menu = useContext(ToastContext);
    return menu;
}
