import DB from "../../configs/dbConfig";

export const handleRegisterDB = async (
  email: string,
  data: any
): Promise<boolean> => {
  try {
    await DB.user.upsert({
      where: {
        email: email,
      },
      update: data,
      create: data,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOneUserByIdDB = async (id: string): Promise<any> => {
  try {
    const result = await DB.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOneUserByEmailDB = async (email: string): Promise<any> => {
  try {
    const result = await DB.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateUserDB = async (id: string, data: any): Promise<boolean> => {
  try {
    await DB.user.update({
      where: {
        id: id,
      },
      data,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
