import React from "react";

const Perk = ({ perks, setPerks }) => {
    const handleCheckboxes = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setPerks([...perks, name]);
        } else {
            setPerks([...perks.filter((selected) => selected !== name)]);
        }
        console.log(e.target.checked);
    };
    return (
        <div>
            <h2 className="text-xl mt-4">Đặc quyền</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
                <label className="border p-4 flex items-center rounded-2xl gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={perks.includes("Wifi")}
                        name="Wifi"
                        onChange={handleCheckboxes}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                        />
                    </svg>

                    <span>Wifi</span>
                </label>
                <label className="border p-4 flex items-center rounded-2xl gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={perks.includes("Gửi xe")}
                        name="Gửi xe"
                        onChange={handleCheckboxes}
                    />
                    <svg
                        className="h-8 w-8 text-black"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <circle cx="7" cy="17" r="2" />{" "}
                        <circle cx="17" cy="17" r="2" />{" "}
                        <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                    </svg>
                    <span>Gửi xe</span>
                </label>
                <label className="border p-4 flex items-center rounded-2xl gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={perks.includes("TV")}
                        name="TV"
                        onChange={handleCheckboxes}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>

                    <span>TV</span>
                </label>
                <label className="border p-4 flex items-center rounded-2xl gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={perks.includes("Thú nuôi")}
                        name="Thú nuôi"
                        onChange={handleCheckboxes}
                    />
                    <svg
                        className="h-8 w-8 text-black"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <path d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21" />
                    </svg>
                    <span>Thú nuôi</span>
                </label>
            </div>
        </div>
    );
};

export default Perk;
