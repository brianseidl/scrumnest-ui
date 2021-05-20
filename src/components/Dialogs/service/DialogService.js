import YesNoDialog from "../components/YesNoDialog";
import CreateStoryModal from "../components/CreateStoryModal";
import CreateNestDialog from "../components/CreateNestDialog";

// Service that will call various dialog types to appear dynamically
export function showYesNoDialog(message) {
  const data = {
    type: YesNoDialog,
    closeButton: true,
    title: "Are you sure?",
    show: true,
    body: message,
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

export function showCreateStoryDialog(nestId, sprint) {
  const data = {
    type: CreateStoryModal,
    closeButton: true,
    nestId: nestId,
    show: true,
    sprint: sprint,
  };

  return CreateStoryModal.create(data).show();
}
