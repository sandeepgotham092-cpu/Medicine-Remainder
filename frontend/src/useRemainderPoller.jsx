import axios from "axios";
import { useEffect } from "react";
import { showNotification } from "./notifications";

export default function useRemainderPoller(pollInterval=2000){
    useEffect(()=>{
        let mounted = true
        async function poll() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/reminders")
                if(res.data === "") return;
                if(!mounted) return;
                const due = res.data
                const title = "Medicine Reminder";
                const body = `Medicice: ${due.name} ${due.dosage ? " - "+due.dosage :""}`;
                showNotification(title,body);
            } catch (error) {
                console.error("Poll error:",error.message)
            }
        }
        poll();
        const id = setInterval(poll,pollInterval)
        return ()=>{
            mounted = false;
            clearInterval(id);
        };


    },[pollInterval]);
}