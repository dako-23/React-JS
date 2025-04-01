import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";

export default function useGroupListItem(editGroup, isJoined, _id, isLocked) {

    const [menuOpen, setMenuOpen] = useState(false)
    const [showEditGroup, setShowEditGroup] = useState(null)
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const { isAdmin } = useContext(UserContext);

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

    const closeShowCreateGroupHandler = () => {
        setShowEditGroup(null)
    }

    const handleEditGroup = async (groupData) => {
        try {
            await editGroup(groupData, _id);
            setShowEditGroup(false);
        } catch (err) {
            console.error('Error editing group:', err);
        }
    }

    const handleClick = () => {

        if (!isJoined) {
            return info('You need to join the group first!');
        }

        if (isLocked) {
            if (isAdmin) {
                return navigate(`/groups/${_id}/chat`);
            }

            return warn('This group is locked!');
        }

        navigate(`/groups/${_id}/chat`);

    };

    return {
        menuOpen,
        showEditGroup,
        handleClick,
        handleEditGroup,
        closeShowCreateGroupHandler,
        setMenuOpen,
        buttonRef,
        menuRef,
        setShowEditGroup
    }

}