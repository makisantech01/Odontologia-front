import React from "react";

const Tooth = ({ data, index, setFace, toggleTooth }) => {
  return (
    <div
      className={
        data.css
          ? `flex flex-col items-center p-0 w-[45px] float-left ml-[10px] ${data.css}`
          : "flex flex-col items-center p-0 w-[45px] float-left ml-[10px] mb-[50px]"
      }
    >
      {data.status ? (
        <button
          className="float-right bg-red-700 text-white px-2 py-0 rounded-lg cursor-pointer"
          onClick={() => toggleTooth((data.status = false))}
        >
          -
        </button>
      ) : (
        <button
          className="float-right bg-green-700 text-white px-2 py-0 rounded-lg cursor-pointer"
          onClick={() => toggleTooth((data.status = true))}
        >
          +
        </button>
      )}

      <small className="text-black text-center clear-both block">
        {data.id}
      </small>

      {/* Diente */}
      <svg
        width="29"
        height="34"
        id={data.id}
        className={data.status ? "" : "hidden"}
      >
        <polygon
          stroke="black"
          points="1.0136711597442627,1.35626420378685 7.767158031463623,9.155386298894882 21.696229934692383,9.155386298894882 28.449718475341797,1.35626420378685 "
          id={data.faces[0].id}
          fill={data.faces[0].estado}
          onClick={() => setFace(data.faces[0].id, 0, data)}
          className="cursor-pointer"
        />

        <polygon
          stroke="black"
          points="21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 28.19916971027851,32.98905944824219 28.41021592915058,0.8176754713058472 "
          id={data.faces[1].id}
          fill={data.faces[1].estado}
          onClick={() => setFace(data.faces[1].id, 1, data)}
          className="cursor-pointer"
        />

        <polygon
          stroke="black"
          points="21.445680618286133,25.29296439886093 28.199169158935547,33.092128217220306 0.7631232142448425,33.092128217220306 7.516610622406006,25.29296439886093 "
          id={data.faces[2].id}
          fill={data.faces[2].estado}
          onClick={() => setFace(data.faces[2].id, 2, data)}
          className="cursor-pointer"
        />

        <polygon
          stroke="black"
          points="0.7631232291460037,1.3051201105117798 0.7631232291460037,33.232784271240234 7.516610696911812,25.189937591552734 7.516610696911812,25.189937591552734 7.516610696911812,9.104242324829102 "
          id={data.faces[3].id}
          fill={data.faces[3].estado}
          onClick={() => setFace(data.faces[3].id, 3, data)}
          className="cursor-pointer"
        />
        <polygon
          stroke="black"
          points="7.516610696911812,9.104242324829102 21.445681169629097,9.104242324829102 21.445681169629097,25.189937591552734 7.516610696911812,25.189937591552734 "
          id={data.faces[4].id}
          fill={data.faces[4].estado}
          onClick={() => setFace(data.faces[4].id, 4, data)}
          className="cursor-pointer"
        />
      </svg>

      {/* Esta es la X */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={!data.status ? "" : "hidden"}
      >
        <path
          fill="red"
          d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
        />
      </svg>
    </div>
  );
};

export default Tooth;
