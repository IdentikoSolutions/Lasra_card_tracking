import React, { useState } from "react"

export const CreateNewReceipt = () => {
    const [createReceiptDto,UpdatereceiptDto] = useState<any>({})


    return <div>
        <h1> New Receipt</h1>
        <div>
            <h1>Receipt Details</h1>
            batchNo
            Date Received,
            no OfCard,
            ReceivedBy,
            DelivedBy


        </div>
        <div>
            <h1>Card Details</h1>

        </div>

    </div>
}