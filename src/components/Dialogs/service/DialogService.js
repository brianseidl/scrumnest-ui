import YesNoDialog from "../components/YesNoDialog";
import CreateStoryModal from "../components/CreateStoryModal";
import CreateNestDialog from "../components/CreateNestDialog";

// Service that will call various dialog types to appear dynamically
export function showYesNoDialog() {
  const data = {
    type: YesNoDialog,
    closeButton: true,
    title: "Are you sure?",
    show: true,
  };

  return YesNoDialog.create(data).show();
}

export function showOptionDialog() {
  // Not in use for now... original functionality was scrapped
}

export function showCreateNestDialog() {
  const data = {
    type: CreateNestDialog,
    closeButton: true,
    show: true,
    title: "Create a Nest",
    fields: [
      {
        type: "text",
        id: "Nest-Name",
        label: "Nest Name",
        value: {
          route: "/board",
        },
      },
    ],
  };

  return CreateNestDialog.create(data).show();
}

export function showConfirmButtonDialog() {
  // Not in use for now... showYesNoDialog is used in preference.
}

export function showCreateStoryDialog(nestId) {
  const data = {
    type: CreateStoryModal,
    closeButton: true,
    nestId: nestId,
    show: true,
  };

  return CreateStoryModal.create(data).show();
}
