import asyncHandler from "../utils/asyncHandler.js";
import adminActionsService from "../services/adminActions.service.js";

export const approveSeller = asyncHandler(async (req, res) => {
  const result = await adminActionsService.approveSeller(req.params.id);
  res.status(200).json(result);
});

export const rejectSeller = asyncHandler(async (req, res) => {
  const result = await adminActionsService.rejectSeller(req.params.id);
  res.status(200).json(result);
});

export const suspendSeller = asyncHandler(async (req, res) => {
  const result = await adminActionsService.setSellerAccountStatus(req.params.id, "suspended");
  res.status(200).json(result);
});

export const activateSeller = asyncHandler(async (req, res) => {
  const result = await adminActionsService.setSellerAccountStatus(req.params.id, "active");
  res.status(200).json(result);
});

export const approveProduct = asyncHandler(async (req, res) => {
  const result = await adminActionsService.approveProduct(req.params.id);
  res.status(200).json(result);
});

export const rejectProduct = asyncHandler(async (req, res) => {
  const result = await adminActionsService.rejectProduct(req.params.id);
  res.status(200).json(result);
});

export const deactivateProduct = asyncHandler(async (req, res) => {
  const result = await adminActionsService.deactivateProduct(req.params.id);
  res.status(200).json(result);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await adminActionsService.deleteProduct(req.params.id);
  res.status(200).json(result);
});

export const generateReport = asyncHandler(async (req, res) => {
  const result = await adminActionsService.generateReport(req.user.id || req.user._id, req.body);
  res.status(201).json(result);
});

export const sendAnnouncement = asyncHandler(async (req, res) => {
  const result = await adminActionsService.sendAnnouncement(req.user.id || req.user._id, req.body);
  res.status(201).json(result);
});
