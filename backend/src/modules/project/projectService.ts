import DB from "../../configs/dbConfig";

export const createProject = async (data: any) => {
  const existingProject = await DB.project.findFirst({
    where: {
      clientId: data.clientId,
      title: data.title,
    },
  });

  if (existingProject) {
    throw new Error(
      "Project with the same title already exists for this client."
    );
  }

  const project = await DB.project.create({ data: data });
  return project;
};

export const updateProject = async (id: string, data: any) => {
  const project = await DB.project.update({
    where: { id },
    data,
  });

  return project;
};

export const deleteProject = async (id: string) => {
  const project = await DB.project.delete({
    where: { id },
  });

  return project;
};

export const getProjectsByUserId = async (userId: string) => {
  const projects = await DB.project.findMany({
    where: {
      client: {
        userId,
      },
    },
  });
  return projects;
};

export const getProjectById = async (id: string) => {
  const project = await DB.project.findUnique({
    where: {
      id,
    },
    include: {
      logs: true,
      reminders: true,
    },
  });

  return project;
};
