import { useActionState, useEffect, useState } from "react";
import { useAdminApi } from "../api/adminApi.js";
import { useToast } from "./useToast.js";

export default function usePartners() {
    const [partners, setPartners] = useState([]);
    const [partnerSearch, setPartnerSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { getAllPartners, createPartner, deletePartner } = useAdminApi();
    const { error, success } = useToast();

    useEffect(() => {
        getAllPartners()
            .then(setPartners)
            .catch((err) => error(err.message));
    }, []);

    const filteredPartners = partners
        .filter((p) =>
            p.name.toLowerCase().includes(partnerSearch.toLowerCase())
        )

    const handleSubmitPartner = async (_, formData) => {

        const values = Object.fromEntries(formData);

        try {
            const newPartner = await createPartner(values);

            setPartners((state) => [newPartner, ...state]);

            setShowModal(false);
        } catch (err) {
            error(err.message)
        }
    };

    const handleDelete = async (partnerId) => {

        const hasConfirm = confirm(
            `Are you sure you want to delete ?`
        );

        if (!hasConfirm) return;

        try {
            await deletePartner(partnerId)

            setPartners((prevPartners) =>
                prevPartners.filter(partner => partner._id !== partnerId)
            );

            success('Successfuly delete this partner!')

        } catch (err) {
            error(err.message)
        }


    }

    const [__, postAction, isPostPending] = useActionState(handleSubmitPartner, {
        content: "",
        imageUrl: "",
    });

    return {
        partners,
        setPartners,
        showModal,
        postAction,
        isPostPending,
        setShowModal,
        setPartners,
        setPartnerSearch,
        partnerSearch,
        filteredPartners,
        handleDelete
    };
}
