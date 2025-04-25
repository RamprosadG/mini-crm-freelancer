import DB from "../../configs/dbConfig";

export const createLog = async (data: any) => {
  const log = await DB.log.create({ data: data });
  return log;
};

export const updateLog = async (id: string, data: any) => {
  const log = await DB.log.update({
    where: { id },
    data,
  });

  return log;
};

export const deleteLog = async (id: string) => {
  const log = await DB.log.delete({
    where: { id },
  });

  return log;
};
