import DB from "../../configs/dbConfig";

export const createClient = async (data: any) => {
  const existingClient = await DB.client.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingClient) {
    throw new Error("Client with the same email already exists.");
  }

  const client = await DB.client.create({ data: data });
  return client;
};

export const updateClient = async (id: string, data: any) => {
  const client = await DB.client.update({
    where: { id },
    data,
  });

  return client;
};

export const deleteClient = async (id: string) => {
  const client = await DB.client.delete({
    where: { id },
  });

  return client;
};

export const getClientsByUserId = async (userId: string) => {
  const clients = await DB.client.findMany({
    where: { userId },
  });
  console.log(clients);
  return clients;
};

export const getClientById = async (id: string) => {
  const client = await DB.client.findUnique({
    where: {
      id,
    },
    include: {
      projects: true,
      logs: true,
      reminders: true,
    },
  });

  return client;
};
