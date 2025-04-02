import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { useToast } from "./useToast.js";

export default function useGroupListItem(editGroup, isJoined, _id, isLocked) {

    const [menuOpen, setMenuOpen] = useState(false)
    const [showEditModal, setShowEditModal] = useState(null)
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const { isAdmin } = useContext(UserContext);
    const { info, warn } = useToast();

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                return;
            }

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const closeEditModal = () => {
        setShowEditModal(null)
    }

    const handleEditGroup = async (groupData) => {

        const { groupName, description, imageUrl, category } = groupData;

        if (!groupName || !description || !imageUrl || !category) {
            return info('Fields with * is required.')
        }

        try {
            await editGroup(groupData, _id);
            setShowEditModal(false);
        } catch (err) {
            console.error('Error editing group:', err);
        }
    }

    const handleClick = () => {

        if (isLocked) {
            return isAdmin ? navigate(`/groups/${_id}/chat`) : warn('This group is locked!');
        }

        if (!isJoined) {
            return info('You need to join the group first!');
        }

        navigate(`/groups/${_id}/chat`);
    };

    return {
        menuOpen,
        showEditModal,
        setShowEditModal,
        handleClick,
        handleEditGroup,
        closeEditModal,
        setMenuOpen,
        buttonRef,
        menuRef,
    }

}