import DB from "../../configs/dbConfig";

export const createReminder = async (data: any) => {
  const reminder = await DB.reminder.create({ data: data });
  return reminder;
};

export const updateReminder = async (id: string, data: any) => {
  const reminder = await DB.reminder.update({
    where: { id },
    data,
  });

  return reminder;
};

export const deleteReminder = async (id: string) => {
  const reminder = await DB.reminder.delete({
    where: { id },
  });

  return reminder;
};
