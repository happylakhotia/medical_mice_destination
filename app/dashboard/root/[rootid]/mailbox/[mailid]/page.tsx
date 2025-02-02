"use client"

import CREATE_ROOM_MUTATION from "@/services/apollo/mutations/createRoom";
import GET_MAIL_QUERY from "@/services/apollo/queries/getMail";
import { useApolloClient, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FORWARD_MAIL_MUTATION from "@/services/apollo/mutations/forwardMail";

export default function Mail({ params }: { params: { mailid: string } }) {
    const client = useApolloClient();
    const [mail, setMail] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        async function getMail() {
            try {
                const mail_id = (await params).mailid;
                const { data } = await client.query({
                    query: GET_MAIL_QUERY,
                    variables: { id: mail_id },
                    context: { requiresAuth: true },
                });
                setMail(data.getMailById);
            } catch (err) {
                console.error("Error fetching mail:", err);
            }
        }
        getMail();
    }, [client]);

    if (!mail) return <h1>Loading...</h1>;

    return (
        <>
            {mail.type === "APPLICATION" ? (
                <Application mail={mail} openDialog={() => setOpenDialog(true)} />
            ) : (
                <NormalMail mail={mail} />
            )}
            <SendToDoctorDialog open={openDialog} mailId={mail.id} onClose={() => setOpenDialog(false)} />
        </>
    );
}

function ForwardedChain({ chain }: { chain: string[] }) {
    if (!chain || chain.length === 0) return null;
    return (
        <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">Forwarded Chain:</h3>
            <ul className="list-disc pl-5">
                {chain.map((email, index) => (
                    <li key={index} className="text-gray-700">{email}</li>
                ))}
            </ul>
        </div>
    );
}

function Application({ mail, openDialog }: { mail: any; openDialog: () => void }) {
    const [createRoom] = useMutation(CREATE_ROOM_MUTATION, { context: { requiresAuth: true } });

    async function handleApprove() {
        try {
            const { data } = await createRoom({ variables: { particpantMail: mail.sender } });
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>Application Mail</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Sender:</strong> {mail.sender}</p>
                <p><strong>Receiver:</strong> {mail.receiver}</p>
                <p><strong>Content:</strong> {mail.content}</p>
                <p><strong>Patient Name</strong> {mail.patientName}</p>
                <p><strong>Patient Age</strong> {mail.patientAge}</p>
                <p><strong>Patient Gender</strong> {mail.patientGender}</p>
                <p><strong>Created At:</strong> {mail.createdAt}</p>
                <ForwardedChain chain={mail.ForwardedChain} />
                {mail.documents && <a href={mail.documents} download className="text-blue-500">Download Documents</a>}
                {mail.passport && <a href={mail.passport} download className="text-blue-500 ml-4">Download Passport</a>}
                <Button onClick={handleApprove} className="mr-2">Approve Application</Button>
                <Button onClick={openDialog}>Send To Doctor</Button>
            </CardContent>
        </Card>
    );
}

function NormalMail({ mail }: { mail: any }) {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>Normal Mail</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Sender:</strong> {mail.sender}</p>
                <p><strong>Receiver:</strong> {mail.receiver}</p>
                <p><strong>Content:</strong> {mail.content}</p>
                <p><strong>Created At:</strong> {mail.createdAt}</p>
                <ForwardedChain chain={mail.ForwardedChain} />
                {mail.documents && <a href={mail.documents} download className="text-blue-500">Download Documents</a>}
                {mail.passport && <a href={mail.passport} download className="text-blue-500 ml-4">Download Passport</a>}
            </CardContent>
        </Card>
    );
}

function SendToDoctorDialog({ open, onClose, mailId }: { open: boolean; onClose: () => void, mailId: string }) {
    const [forwardMail] = useMutation(FORWARD_MAIL_MUTATION, {
        context: { requiresAuth: true }
    });

    async function handleForward(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const forwardTo = formData.get("forwardTo");
        try {
            const { data } = await forwardMail({ variables: { mailId, forwardTo } });
            console.log(data);
            onClose();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send to Doctor</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleForward}>
                    <Input type="email" name="forwardTo" placeholder="Enter Doctor's Email" className="mb-4" />
                    <DialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit">Send</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}