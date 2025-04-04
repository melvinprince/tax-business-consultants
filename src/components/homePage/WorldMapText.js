import CountUpOnView from "../CountUpOnView"; // Adjust the import path as needed

const data = [
  {
    image: "/svg/customer-satisfaction.svg",
    number: 100,
    symbol: "%",
    text: "Customer Satisfaction",
  },
  {
    image: "/svg/years-in-business.svg",
    number: 12,
    symbol: "+",
    text: "Years in Business",
  },
  {
    image: "/svg/awards-won.svg",
    number: 5,
    symbol: "+",
    text: "Awards Won",
  },
  {
    image: "/svg/happy-clients.svg",
    number: 400,
    symbol: "+",
    text: "Happy Clients",
  },
];

export default function WorldMapText() {
  return (
    <div className="flex flex-col max-14xl:flex-row flex-wrap justify-center items-center gap-[4rem] absolute top-[50%] right-[20rem] max-14xl:right-0 translate-y-[-50%] max-12xl:grid max-12xl:grid-cols-2 max-5xl:grid-cols-1 max-12xl:relative max-12xl:row-gap-[5rem] max-12xl:px-[10rem] max-6xl:px-[5rem]">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-[3rem] backdrop-blur-sm border border-gray-300 px-[3rem] py-[2rem] rounded-[25px] max-6xl:w-[100%]"
        >
          <img
            src={item.image}
            alt={item.text}
            className="w-[10rem] h-[10rem]"
          />
          <div className="font-bold">
            <div className="text-7xl flex gap-[1rem]">
              <CountUpOnView end={item.number} duration={3} />
              <span>{item.symbol}</span>
            </div>
            <p className="text-3xl">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
