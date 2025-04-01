import { toast } from 'react-toastify';
import { useGroup, useGroupGetAll } from '../api/groupApi';
import { useToast } from './useToast.js';
import { usePagination } from './usePagination.js';

const { error, success, info, warn } = useToast()

export function useGroupsList(userId) {

  const {
    create,
    joinGroup,
    leaveGroup,
    editGroup,
    groupDelete,
    toggleLockGroup
  } = useGroup();

  const {
    groups,
    setGroups,
    joinedGroups,
    setJoinedGroups,
    loading,
  } = useGroupGetAll();
  const { currentPage, totalPages, currentData, changePage } = usePagination(groups, 4);

  const createGroupHandler = async (groupData) => {
    try {
      const newGroup = await create(groupData);
      setGroups((state) => [newGroup, ...state]);

      if (newGroup._ownerId === userId) {
        setJoinedGroups((state) => [...state, newGroup._id]);
      }

      success('Group created successfully!')

      return newGroup;
    } catch (err) {
      console.log(err.message);
    }
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
      info('You need to be logged in.')
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

      success('Group updated successfully!')

      return result;
    } catch (err) {
      error('Error editing group !')
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

      success('Successfuly delete this group!');
    } catch (err) {
      console.error('Error deleting group:', err);
      toast.error('Error deleting group')
    }
  };

  const toggleLock = async (groupId) => {
    
    try {
      await toggleLockGroup(groupId);

      setGroups(prev =>
        prev.map(group =>
          group._id === groupId
            ? { ...group, isLocked: !group.isLocked }
            : group
        )
      );

    } catch (err) {
      error(err.message)
    }
  };

  const toggleJoin = (groupId) => {
    joinedGroups.includes(groupId)
      ? leaveGroupHandler(groupId)
      : joinGroupHandler(groupId);
  };

  return {
    loading,
    currentGroups: currentData,
    joinedGroups,
    currentPage,
    totalPages,
    changePage,
    createGroupHandler,
    editGroupHandler,
    deleteGroupHandler,
    toggleJoin,
    toggleLock
  };
}
