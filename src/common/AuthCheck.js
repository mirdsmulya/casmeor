import Toastr from 'toastr';


export function AuthCheck(props) {
    const expTime = sessionStorage.getItem('expired_time');
    const payloadValue = JSON.parse(expTime) * 1000;
    const time = new Date().getTime();

    if (payloadValue && payloadValue < time ) {
        props.push('/login');
        return Toastr.info("Session Timeout"); 
    }

    if (!expTime) {
        props.push('/login');
        return Toastr.info("Login Required"); 
    } 
}  
