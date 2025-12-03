
export async function requestNotificationPer() {
    if(!("Notification" in window)) return false;
    const p = await Notification.requestPermission();
    return p == 'granted';
}
export function showNotification(title,body){
    if (Notification.permission == "granted"){
        new Notification(title,{
            body,icon:"src/images/medicine.jpg",
        } )
    }
}