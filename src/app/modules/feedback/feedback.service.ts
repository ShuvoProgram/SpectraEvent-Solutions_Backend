import { Feedback } from "@prisma/client";
import prisma from "../../../utils/prisma";

const createFeedback = async (payload: Feedback) => {
    const result = await prisma.feedback.create({
        data: payload,
    })
    return result;
}

const getFeedback = async (id: string) => {
    const result = await prisma.feedback.findUnique({
        where: {id},
    })
    return result;
}

const updateFeedback = async (id: string, payload: Partial<Feedback>) => {
    const result = await prisma.feedback.update({
        where: {id},
        data: payload,
    })
    return result;
};

const deleteFeedback = async (id: string) => {
    const result = await prisma.feedback.delete({where: {id}});
    return result;
};

const getAllFeedback = async () => {
    const result = await prisma.feedback.findMany({
    })
    return result;
};

export const FeedbackService = {
    createFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback,
    getAllFeedback
}