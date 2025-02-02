'use client'

import { useEffect } from "react"

export default function Flights() {




    async function Authenticate() {
        try {
            const response = await fetch("http://sharedapi.tektravels.com/SharedData.svc/rest/Authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "ClientId": "ApiIntegrationNew",
                        "UserName": "Hackathon",
                        "Password": "Hackathon@1234",
                        "EndUserIp": "45.118.49.35"
                    }

                )
            })

            if (!response.ok) {
                const data = await response.json()
                console.log(data)

            }

            const data = await response.json()
            localStorage.setItem("TBOTOKEN", data.TokenId)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }


    async function Search(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const token = formData.get("token")
        console.log(token)
        try {
            const response = await fetch("http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "EndUserIp": "45.118.49.35",
                        "TokenId": `${token}`,
                        "AdultCount": "1",
                        "ChildCount": "0",
                        "InfantCount": "0",
                        "DirectFlight": "false",
                        "OneStopFlight": "false",
                        "JourneyType": "1",
                        "PreferredAirlines": null,
                        "Segments": [
                            {
                                "Origin": "DEL",
                                "Destination": "BOM",
                                "FlightCabinClass": "1",
                                "PreferredDepartureTime": "2025-12-30T00: 00: 00",
                                "PreferredArrivalTime": "2024-12-30T00: 00: 00"
                            }
                        ],
                        "Sources": null
                    }

                )
            })

            if (!response.ok) {
                const data = await response.json()
                console.log(data)
            }

            const data = await response.json()
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }

    async function FairQuote(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const index = formData.get("index")
        const traceId = formData.get("traceid")
        const token = formData.get("token")
        try {
            const response = await fetch("http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareQuote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "EndUserIp": "45.118.49.35",
                    "TokenId": `${token}`,
                    "TraceId": `${traceId}`,
                    "ResultIndex": `${index}`
                })
            })

            if (!response.ok) {
                const data = await response.json()
                console.log(data)
            }
            const data = await response.json()
            console.log(data)

        } catch (err) {
            console.log(err)
        }

    }

    async function Book(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const index = formData.get("index")
        const token = formData.get("token")
        const trace_id = formData.get("traceid")
        const baseFair = formData.get("base_fair")
        const tax = formData.get("tax")
        const yqtax = formData.get("yqtax")
        const additionalTxnFeePub = formData.get("txn_fee_pub")
        const additionalTxnFeeOfd = formData.get("txn_fee_ofd")
        const otherCharges = formData.get("other_charges")
        const discount = formData.get("discount")
        const publishedFare = formData.get("published_fare")
        const offeredFare = formData.get("offered_fare")
        const tdsonCommision = formData.get("tds_on_commission")
        const tdsonPub = formData.get("tds_on_plb")
        const tdsonIncentive = formData.get("tds_on_incentive")
        const serviceFee = formData.get("service_fee")
        try {
            const response = await fetch("http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "TokenId": `${token}`,
                    "EndUserIp": "45.118.49.35",
                    "TraceId": `${trace_id}`,
                    "Passengers": [{
                        "Title": "Mr",
                        "FirstName": "hgjsshsxsgjh",
                        "LastName": "tbotest",
                        "PaxType": 1,
                        "DateOfBirth": "1987-12-06T00:00:00",
                        "Gender": 1,
                        "PassportNo": "KJHHJKHKJH",
                        "PassportExpiry": "2026-12-06T00:00:00",
                        "AddressLine1": "123, Test",
                        "AddressLine2": "",
                        "Fare": {
                            "Currency": "INR",
                            "BaseFare": Number(baseFair),
                            "Tax": Number(tax),
                            "YQTax": Number(yqtax),
                            "AdditionalTxnFeePub": Number(additionalTxnFeePub),
                            "AdditionalTxnFeeOfrd": Number(additionalTxnFeeOfd),
                            "OtherCharges": Number(otherCharges),
                            "Discount": Number(discount),
                            "PublishedFare": Number(publishedFare),
                            "OfferedFare": Number(offeredFare),
                            "TdsOnCommission": Number(tdsonCommision),
                            "TdsOnPLB": Number(tdsonPub),
                            "TdsOnIncentive": Number(tdsonIncentive),
                            "ServiceFee": Number(serviceFee),
                        },
                        "City": "Gurgaon",
                        "CountryCode": "IN",
                        "CellCountryCode": "+92581-",
                        "ContactNo": "1234567890",
                        "Nationality": "IN",
                        "Email": "harsh@tbtq.in",
                        "IsLeadPax": true,
                        "FFAirlineCode": null,
                        "FFNumber": "",
                        "GSTCompanyAddress": "",
                        "GSTCompanyContactNumber": "",
                        "GSTCompanyName": "",
                        "GSTNumber": "",
                        "GSTCompanyEmail": ""
                    }],
                    "ResultIndex": `${index}`
                }
                )
            })
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
            }

            const data = await response.json()
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <button
                onClick={Authenticate}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
            >
                Authenticate
            </button>

            {/* Search Form */}
            <form onSubmit={Search} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label htmlFor="token" className="block text-gray-700 font-medium mb-2">
                        Token
                    </label>
                    <input
                        type="text"
                        name="token"
                        id="token"
                        placeholder="What is the token?"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Search
                </button>
            </form>

            {/* FairQuote Form */}
            <form onSubmit={FairQuote} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label htmlFor="index" className="block text-gray-700 font-medium mb-2">
                        Index
                    </label>
                    <input
                        type="text"
                        name="index"
                        id="index"
                        placeholder="Enter The Index"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="traceid" className="block text-gray-700 font-medium mb-2">
                        Trace ID
                    </label>
                    <input
                        type="text"
                        name="traceid"
                        id="traceid"
                        placeholder="Enter The Trace Id"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="token" className="block text-gray-700 font-medium mb-2">
                        Token
                    </label>
                    <input
                        type="text"
                        name="token"
                        id="token"
                        placeholder="Enter The Token"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    FairQuote
                </button>
            </form>
            <form onSubmit={Book} className="max-w-lg mx-auto p-4 space-y-4">
                <div>
                    <label htmlFor="index" className="block text-sm font-medium text-gray-700">
                        Index
                    </label>
                    <input type="text" id="index" name="index" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                        Token
                    </label>
                    <input type="text" id="token" name="token" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="traceid" className="block text-sm font-medium text-gray-700">
                        Trace ID
                    </label>
                    <input type="text" id="traceid" name="traceid" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="base_fair" className="block text-sm font-medium text-gray-700">
                        Base Fair
                    </label>
                    <input type="text" id="base_fair" name="base_fair" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="tax" className="block text-sm font-medium text-gray-700">
                        Tax
                    </label>
                    <input type="text" id="tax" name="tax" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="yqtax" className="block text-sm font-medium text-gray-700">
                        YQ Tax
                    </label>
                    <input type="text" id="yqtax" name="yqtax" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="txn_fee_pub" className="block text-sm font-medium text-gray-700">
                        Additional Txn Fee Pub
                    </label>
                    <input type="text" id="txn_fee_pub" name="txn_fee_pub" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="txn_fee_ofd" className="block text-sm font-medium text-gray-700">
                        Additional Txn Fee Ofd
                    </label>
                    <input type="text" id="txn_fee_ofd" name="txn_fee_ofd" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="other_charges" className="block text-sm font-medium text-gray-700">
                        Other Charges
                    </label>
                    <input type="text" id="other_charges" name="other_charges" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                        Discount
                    </label>
                    <input type="text" id="discount" name="discount" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="published_fare" className="block text-sm font-medium text-gray-700">
                        Published Fare
                    </label>
                    <input type="text" id="published_fare" name="published_fare" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="offered_fare" className="block text-sm font-medium text-gray-700">
                        Offered Fare
                    </label>
                    <input type="text" id="offered_fare" name="offered_fare" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="tds_on_commission" className="block text-sm font-medium text-gray-700">
                        TDS on Commission
                    </label>
                    <input type="text" id="tds_on_commission" name="tds_on_commission" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="tds_on_plb" className="block text-sm font-medium text-gray-700">
                        TDS on PLB
                    </label>
                    <input type="text" id="tds_on_plb" name="tds_on_plb" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="tds_on_incentive" className="block text-sm font-medium text-gray-700">
                        TDS on Incentive
                    </label>
                    <input type="text" id="tds_on_incentive" name="tds_on_incentive" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                    <label htmlFor="service_fee" className="block text-sm font-medium text-gray-700">
                        Service Fee
                    </label>
                    <input type="text" id="service_fee" name="service_fee" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <button type="submit" className="bg-red-300 m-4 p-4 text-white">
                    Book
                </button>
            </form>
        </>

    )




}