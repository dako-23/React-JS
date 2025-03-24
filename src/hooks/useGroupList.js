import { toast } from 'react-toastify';
import { useGroup, useGroupGetAll } from '../api/groupApi';
import { useState } from 'react';

export function useGroupsList(userId) {
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 4;

  const {
    create,
    joinGroup,
    leaveGroup,
    editGroup,
    groupDelete,
  } = useGroup();

  const {
    groups,
    setGroups,
    joinedGroups,
    setJoinedGroups,
    loading,
  } = useGroupGetAll();

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);
  const totalPages = Math.ceil(groups.length / groupsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createGroupHandler = async (groupData) => {
    const newGroup = await create(groupData);

    setGroups((state) => [newGroup, ...state]);

    if (newGroup._ownerId === userId) {
      setJoinedGroups((state) => [...state, newGroup._id]);
    }

    return newGroup;
  };


  const joinGroupHandler = async (groupId) => {
    try {
      await joinGroup(groupId);

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId
            ? { ...group, joinedGroup: [...group.joinedGroup, userId] }
            : group
        )
      );

      setJoinedGroups((prev) => [...prev, groupId]);
    } catch (err) {
      console.error('Error joining group:', err);
      toast.info('You need to be logged in')
    }
  };

  const leaveGroupHandler = async (groupId) => {
    try {
      await leaveGroup(groupId);

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId
            ? {
              ...group,
              joinedGroup: group.joinedGroup.filter((id) => id !== userId),
            }
            : group
        )
      );

      setJoinedGroups((prev) => prev.filter((id) => id !== groupId));
    } catch (err) {
      console.error('Error leaving group:', err);
    }
  };

  const editGroupHandler = async (updatedData, groupId) => {
    try {
      const result = await editGroup(groupId, updatedData);

      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId ? { ...group, ...updatedData } : group
        )
      );

      return result;
    } catch (err) {
      console.error('Error editing group:', err);
      toast.error('Error editing group')
    }
  };

  const deleteGroupHandler = async (groupId, groupName) => {
    const hasConfirm = confirm(
      `Are you sure you want to delete ${groupName} group?`
    );

    if (!hasConfirm) return;

    try {
      await groupDelete(groupId);

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (err) {
      console.error('Error deleting group:', err);
      toast.error('Error deleting group')
    }
  };

  const toggleJoin = (groupId) => {
    joinedGroups.includes(groupId)
      ? leaveGroupHandler(groupId)
      : joinGroupHandler(groupId);
  };

  return {
    loading,
    currentGroups,
    joinedGroups,
    currentPage,
    totalPages,
    changePage,
    createGroupHandler,
    editGroupHandler,
    deleteGroupHandler,
    toggleJoin,
    setCurrentPage,
  };
}
