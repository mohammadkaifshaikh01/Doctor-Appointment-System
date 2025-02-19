import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor"

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [appointmentTime, setAppointmentTime] = useState(" ");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log("doc info : ", docInfo);
  };

  const getAvailable = async () => {
    setAppointments([]);
    // today date geting
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);
      // end time of the date
      let endDate = new Date(today);
      endDate.setDate(today.getDate() + i);
      endDate.setHours(21, 0, 0, 0);
      // hour minuetes and seconds

      // ------------

      // setting hours

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(
          currDate.getHours() > 10 ? currDate.getHours() + 1 : 10
        );
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currDate < endDate) {
        let formattedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slots to array
        timeSlots.push({
          datetime: new Date(currDate),
          time: formattedTime,
        });

        // incremetn curr time 30 minutes
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      setAppointments((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailable();
  }, [docInfo]);

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);
  return (
    docInfo && (
      <div>
        {/* Doc Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-orange-500 w-full sm:max-w-72 rounded-2xl"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-gray-100 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Info  */}
            <p className="flex items-center gap-2 text-2xl font-medium text-blue-900">
              {docInfo.name} <img className="w-4" src={assets.verified_icon} />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
              <p>
                {docInfo.specialization} - {docInfo.degree}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-orange-400 font-medium mt-4">
              Appointment Fee :{" "}
              <span>
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* bOOKING SLOS */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4 ">
            {appointments.length &&
              appointments.map((elem, index) => (
                <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-orange-400 text-white" : "border border-gray-300"}`} key={index}>
                  <p>{elem[1] && daysOfWeek[elem[0].datetime.getDay()]}</p>
                  <p>{elem[0] && elem[0].datetime.getDate()}</p>
                </div>
              ))}

             
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                {appointments.length && appointments[slotIndex].map((elem,index)=>(
                  <p onClick={()=>setAppointmentTime(elem.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${elem.time === appointmentTime ? "bg-orange-400 text-white" : "border border-gray-300"}`} key={index}>
                    {elem.time.toLowerCase()}
                  </p>
                )) }
              </div>
              <button className="bg-orange-400 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer">Book an appointment</button>
        </div>

        {/* Listing Related Doctors  */}
                <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
