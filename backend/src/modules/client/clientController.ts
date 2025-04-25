import { Request, Response } from "express";
import {
  createClient,
  deleteClient,
  getClientById,
  getClientsByUserId,
  updateClient,
} from "./clientService";

export const createClientController = async (req: Request, res: Response) => {
  try {
    const newClient = await createClient(req?.body);

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: newClient,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedClient = await updateClient(id, data);

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteClientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedClient = await deleteClient(id);

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: deletedClient,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getClientsByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const clients = await getClientsByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Clients retrieved successfully",
      data: clients,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getClientByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clients = await getClientById(id);

    res.status(200).json({
      success: true,
      message: "Client retrieved successfully",
      data: clients,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
