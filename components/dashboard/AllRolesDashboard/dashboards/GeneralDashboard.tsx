import Image from "next/image";
import RecentActivities from "../RecentActivities";
import ErrorAlerts from "../ErrorAlerts";
export default function GeneralDashboard() {
  const SyncedDevices = [
    {
      os: "Windows 11 Pro",
      title: "HP Desktop-XXXXX",
      lastSync: "yesterday at 7:45 AM",
      files: "14 files",
      directories: "2 directories",
      used: "5.59GB",
      total: "10GB",
    },
    {
      os: "Windows 11 Pro",
      title: "HP Desktop-XXXX",
      lastSync: "yesterday at 7:45 AM",
      files: "22 files",
      directories: "3 directories",
      used: "8.2GB",
      total: "10GB",
    },
    {
      os: "Windows 11 Pro",
      title: "HP Desktop-XXXX",
      lastSync: "yesterday at 7:45 AM",
      files: "22 files",
      directories: "3 directories",
      used: "2GB",
      total: "10GB",
    },
  ];

  const StorageStats = [
    { name: "Documents", size: "523MB", files: 50 },
    { name: "Images", size: "2.59GB", files: 120 },
    { name: "Videos", size: "12.89GB", files: 30 },
    { name: "Audio", size: "989MB", files: 18 },
    { name: "Zipped", size: "753GB", files: 90 },
    { name: "Other", size: "523MB", files: 25 },
  ];

  const linkedDevices = [
    { id: 1, name: "Windows - Chrome" },
    { id: 2, name: "iPhone - Safari" },
    { id: 3, name: "Windows - Chrome" },
    { id: 4, name: "Windows - Chrome" },
  ];

  <div className="grid grid-rows-6 p-2 gap-4">
    {StorageStats.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between text-black rounded-2xl border border-[#EBECF0] p-3 shadow-sm"
      >
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* File Icon */}
          <div className="bg-green-100 p-2 rounded-xl">📄</div>

          {/* Text Content */}
          <div>
            <h2 className="font-medium text-sm">{item.name}</h2>
            <p className="text-gray-500 text-xs">{item.files} files</p>
          </div>
        </div>

        {/* Right Section (Size) */}
        <div className="text-green-500 font-semibold text-sm">{item.size}</div>
      </div>
    ))}
  </div>;

  return (
    <div className="flex gap-4 mt-10">
      <div className="max-w-[78%] w-full">
        <div className="rounded-2xl p-3 shadow-[0px_0px_6.5px_0px_#00000040]">
          <div className="flex w-full overflow-hidden rounded-lg">
            <div className="flex-1 bg-[#D46BC5] text-white text-center py-4 ">
              Archived
            </div>
            <div className="flex-1 bg-[#F1A37E] text-white text-center py-4 ">
              Shared
            </div>
            <div className="flex-1 bg-[#7BC4E2] text-white text-center py-4 ">
              Synced
            </div>
            <div className="flex-1 bg-[#97C1A9] text-white text-center py-4 ">
              Other
            </div>
            <div className="flex-1 bg-[#97C1A9]/20 text-white text-center py-4 "></div>
          </div>

          {/* Values */}
          <div className="flex justify-between text-gray-500 text-sm px-1 ">
            <span className="text-[20px] ">0.0</span>
            <span className="text-[20px] ">15.0</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="max-w-[73%] w-full rounded-2xl p-3 shadow-[0px_0px_6.5px_0px_#00000040]">
            <div className="text-[#97C1A9] mb-2">Synced Devices</div>

            <div className="flex gap-2">
              {SyncedDevices.length > 0 &&
                SyncedDevices.map((device, index) => {
                  // convert "5.59GB" & "10GB" into numbers
                  const usedValue = parseFloat(device.used);
                  const totalValue = parseFloat(device.total);
                  const percentage = Math.min(
                    (usedValue / totalValue) * 100,
                    100
                  ); // cap at 100%

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#97C1A9] w-full flex flex-col items-center py-3 px-2"
                    >
                      {/* Device Icon */}
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_431_6470)">
                          <path
                            d="M38.6279 5.94336H2.97106C2.15052 5.94336 1.48535 6.60853 1.48535 7.42906V31.2003C1.48535 32.0209 2.15052 32.686 2.97106 32.686H38.6279C39.4485 32.686 40.1136 32.0209 40.1136 31.2003V7.42906C40.1136 6.60853 39.4485 5.94336 38.6279 5.94336Z"
                            stroke="#97C1A9"
                            strokeWidth="2.97141"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.8279 32.6855L14.8564 40.1141"
                            stroke="#97C1A9"
                            strokeWidth="2.97141"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23.7705 32.6855L26.7419 40.1141"
                            stroke="#97C1A9"
                            strokeWidth="2.97141"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.8857 40.1152H29.7142"
                            stroke="#97C1A9"
                            strokeWidth="2.97141"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M28.2281 19.3145H13.3711"
                            stroke="#97C1A9"
                            strokeWidth="2.97141"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_431_6470">
                            <rect
                              width="41.5997"
                              height="41.5997"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      {/* Device Info */}
                      <div className="text-[#838884] text-sm mt-1">
                        {device.os}
                      </div>
                      <div className="text-[#838884] text-sm">
                        {device.title}
                      </div>
                      <div className="text-[#97C1A9] text-sm mt-2">
                        Last Sync {device.lastSync}
                      </div>

                      {/* Files & Directories */}
                      <div className="flex items-center gap-2 mt-3 text-[#5B6B62] text-sm">
                        <span>📄 {device.files}</span>
                        <span>📁 {device.directories}</span>
                      </div>

                      {/* Used Storage + Progress Bar */}
                      <div className="w-[90%] mt-2">
                        <div className="text-[#5B6B62] text-xs mb-1">
                          Used: {device.used} / {device.total}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-[6px]">
                          <div
                            className="bg-[#97C1A9] h-[6px] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="max-w-[27%] w-full rounded-2xl p-3 shadow-[0px_0px_6.5px_0px_#00000040]">
            <h2 className="text-[16px] font-normal text-[#9AC4B5] mb-4">
              Linked Devices
            </h2>

            <div
              className="space-y-2.5 overflow-y-auto pr-2"
              style={{ maxHeight: "210px" }}
            >
              {linkedDevices.map((device) => (
                <div
                  key={device.id}
                  className="border border-[#9AC4B5] rounded-xl p-3 flex items-center gap-3  "
                >
                  <div className="w-6 h-6  rounded-lg flex items-center justify-center flex-shrink-0">
                    {device.name.includes("iPhone") ? (
                      <svg
                        className="w-6 h-6 text-[#9AC4B5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-[#9AC4B5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-[#666664] text-[12px] font-medium">
                    {device.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RecentActivities />
        <ErrorAlerts />
      </div>
      <div className="max-w-[22%] w-full rounded-2xl p-3 shadow-[0px_0px_6.5px_0px_#00000040]">
        <div className="flex justify-center mb-4">
          <h3 className="text-[16px] font-normal text-[#97C1A9] leading-5">
            Cloudy Storage
          </h3>
        </div>
        <div className="flex justify-center px-2 ">
          <Image
            src="/user-dashboard/judgement.png"
            alt="Cloudy Storage"
            width={210}
            height={165}
          />
        </div>
        <div className="grid grid-rows-6 p-2 gap-4">
          {StorageStats.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between text-black rounded-[12px] border p-3 ${
                item.name === "Images"
                  ? " border-[#7F00FF]"
                  : "border-[#EBECF0]"
              }`}
            >
              {/* Left Section */}
              <div className="flex items-center gap-3">
                {/* File Icon */}
                <div className="bg-green-100 p-2 rounded-[12px]">📄</div>

                {/* Text Content */}
                <div>
                  <h2 className="font-normal text-[14px] text-[#838884]">
                    {item.name}
                  </h2>
                  <p className="text-gray-500 text-xs">{item.files} files</p>
                </div>
              </div>

              {/* Right Section (Size) */}
              <div className="text-[#39FF14] font-semibold text-sm">
                {item.size}
              </div>
            </div>
          ))}
        </div>
        ; ;
      </div>
    </div>
  );
}
