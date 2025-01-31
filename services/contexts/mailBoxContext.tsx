import { createContext, useState, useContext } from "react";

export interface Mail {
    id: string
    content: string
    createdAt: string
    receiver: string
    sender: string
    type: string
}

interface MailboxData {
    id: string
    received: string[]
    receivedEmails: Mail[]
    sent: string[]
    sentmails: Mail[]
}

interface MailBoxContextInterface {
    mailBox: MailboxData | undefined;
    addMailToSent: (mail: Mail) => void;
    addMailToReceived: (mail: Mail) => void;
    uploadMailBox: (mailbox: MailboxData) => void
}

const MailBoxContext = createContext<MailBoxContextInterface | undefined>(undefined);

export function MailBoxProvider({ children }: { children: React.ReactNode }) {
    const [mailBox, setMailBox] = useState<MailboxData | undefined>(undefined);


    function uploadMailBox(mailbox: MailboxData) {
        setMailBox(mailbox)
    }


    function addMailToSent(mail: Mail) {
        setMailBox(prev => {
            if (!prev) return prev;
            
            return {
                ...prev,
                sent: [...prev.sent, mail.id],
                sentMails: [...prev.sentmails, mail],
            };
        });
    }

    function addMailToReceived(mail: Mail) {
        setMailBox(prev => {
            if (!prev) return prev;
            
            return {
                ...prev,
                received: [...prev.received, mail.id],
                receivedEmails: [...prev.receivedEmails, mail],
            };
        });
    }

    const value = {
        mailBox,
        addMailToSent,
        addMailToReceived,
        uploadMailBox
    };

    return (
        <MailBoxContext.Provider value={value}>
            {children}
        </MailBoxContext.Provider>
    );
}

export function useMailBox() {
    const context = useContext(MailBoxContext);
    if (context === undefined) {
        throw new Error('useMailBox must be used within a MailBoxProvider');
    }
    return context;
}

export function initializeMailBox(mailBoxData: MailboxData) {
    return mailBoxData;
}