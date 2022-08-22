import { useState } from "react";
import { useNavigate } from "react-router"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import exitimage from "../images/exit.png"

const SetTime = ({trigger, toggleTrigger}) => {
  const navigate = useNavigate();
  const [selectedDate, setDate] = useState();
  const hours = useSelector(state => state.restaurant.hours)

  const handleContinue = () => navigate("/order-menu", { state: selectedDate })

  const isOpen = (date) => {
    const now = new Date();
    now.setHours(now.getHours() - 24)
    if(date > now){
      const day = date.getDay();
      return day !== 0
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6
  };
  
  const filterHours = (date) => {
    if(isOpen(date)){
      if(isWeekday(date)){
        const now = new Date()
        const time = date.toLocaleTimeString("it-IT")
        return time > hours.mon_fri.open && time < hours.mon_fri.close && date > now;
      } else {
        const now = new Date()
        
        const time = date.toLocaleTimeString("it-IT")
        return time > hours.sat.open && time < hours.sat.close && date > now;
      }
    }
  };

  return trigger ? (
    <div className="popup-outer">
      <div className="popup-inner">
        <img className="exit" src={exitimage} width="20px" alt="close" onClick={() => {
          toggleTrigger(false)
          navigate("/")
        }}/>
        <h3>When will you pick up your order?</h3>
      
        <DatePicker
          className="datepicker form-control"
          selected={selectedDate}
          onChange={(date) => setDate(date)}
          showTimeSelect
          filterDate={isOpen}
          filterTime={filterHours}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={15}
          timeCaption="time"
        />
        <button className="continue-menu" onClick={handleContinue} disabled={!selectedDate}>Continue To Menu</button>
      </div>
    </div>
  ) : ""
}

export default SetTime;