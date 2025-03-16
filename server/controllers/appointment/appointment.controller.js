import { ReasonPhrases, StatusCodes } from "http-status-codes";
import appointmentModel from "../../models/appointment.model.js";
import mongoose, { Error } from "mongoose";

const appointmentController = {
    createAppointment: async (req, res) => {
        const { body } = req;
        const userFromToken = req.user;
        try {
            const startOfDay = new Date(`${body.date}T00:00:00.000Z`);
            const endOfDay = new Date(`${body.date}T23:59:59.999Z`);

            const bookedSlot = await appointmentModel.findOne({
                doctorId: body.doctorId,
                status: { $nin: ["cancelled", "completed"] },
                date: { $gte: startOfDay, $lte: endOfDay },
                timeSlot: body.timeSlot
            });

            if (bookedSlot) {
                return res.status(200).json({ msg: "Slot is already booked", bookedSlot });
            }
            const appointment = await appointmentModel.create({ ...body, date: new Date(body.date), patientId: userFromToken._id });
            res.status(StatusCodes.CREATED).json({ msg: "Appointment booked successfully", appointment });

        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    getAppointment: async (req, res) => {
        const { id } = req.params;
        const userFromToken = req.user;
        const { recordsPerPage = 10, page = 0 } = req.query;
        const skip = page * recordsPerPage;
        const matchCondition = {};
        // console.log(userFromToken);
        if (userFromToken.role !== 'admin') {
            if (userFromToken.role === 'doctor') matchCondition.doctorId = new mongoose.Types.ObjectId(userFromToken._id);
            if (userFromToken.role === 'patient') matchCondition.patientId = new mongoose.Types.ObjectId(userFromToken._id);
            if (id) matchCondition._id = new mongoose.Types.ObjectId(id);
        }
        try {
            const appointments = await appointmentModel.aggregate([
                {
                    $match: { ...matchCondition }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "patientId",
                        foreignField: "_id",
                        as: "patientDetails"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "doctorId",
                        foreignField: "_id",
                        as: "doctorDetails"
                    }
                },
                {
                    $unwind: "$patientDetails"
                },
                {
                    $unwind: "$doctorDetails"
                },
                {
                    $project: {
                        _id: 1,
                        date: 1,
                        timeSlot: 1,
                        status: 1,
                        "patient": '$patientDetails.name',
                        "doctor": "$doctorDetails.name",
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }],  // Count total documents
                        data: [{ $skip: skip }, { $limit: parseInt(recordsPerPage) }]  // Pagination
                    }
                }
            ]);
            const totalCount = appointments[0]?.metadata[0]?.total || 0;
            if (id) return res.json(appointments[0])
            res.json({
                totalPages: Math.ceil(totalCount / recordsPerPage),
                currentPage: page,
                totalCount,
                data: appointments[0]?.data || []
            });

        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    update: async (req, res) => {
        const { body } = req;
        const { id } = req.params;
        const userFromToken = req.user;
        console.log(id, body);
        try {
            const appointment = await appointmentModel.findOne({ _id: id });
            console.log(appointment);
            if (!appointment) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid appointment id' });
            const u = await appointmentModel.updateOne({ _id: new mongoose.Types.ObjectId(id) },
                { $set: { status: body.status, cancelledBy: userFromToken._id } });
            console.log(u)
            res.json({ msg: 'Updated Successfully' })

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
            console.log(error);
        }
    },
    trends: async (req, res) => {
        try {
            const days = [];
            const getDateofLast10days = () => {
                let today = new Date();
                for (let i = 9; i >= 0; i--) {
                    let date = new Date();
                    date.setDate(today.getDate() - i);
                    days.push({ _id: date.toLocaleDateString('en-CA'), bookedCount: 0, cancelledCount: 0, completedCount: 0 });
                }
            }
            getDateofLast10days();
            const data = await appointmentModel.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                        bookedCount: { $sum: 1 },
                        cancelledCount: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] } },
                        completedCount: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } }
                    }
                }
            ]);
            for (let i of data) {
                let isPresent = days.findIndex(val => val._id === i._id);
                if (isPresent != -1) {
                    days[isPresent].bookedCount = i.bookedCount;
                    days[isPresent].cancelledCount = i.cancelledCount;
                    days[isPresent].completedCount = i.completedCount;
                }
            }
            res.json(days);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
            console.log(error);
        }
    },
    bookedSlots: async (req, res) => {
        const { date, doctorId, timeSlot } = req.query;

        try {
            const startOfDay = new Date(`${date}T00:00:00.000Z`);
            const endOfDay = new Date(`${date}T23:59:59.999Z`);

            const bookedSlot = await appointmentModel.findOne({
                doctorId: doctorId,
                status: { $nin: ["cancelled", "completed"] },
                date: { $gte: startOfDay, $lte: endOfDay },
                timeSlot: timeSlot
            });

            if (bookedSlot) {
                return res.status(200).json({ msg: "Slot is already booked", bookedSlot });
            }

            res.status(200).json({ msg: "Slot is available" });
        } catch (error) {
            res.status(500).json({ msg: error?.message || "Internal Server Error" });
            console.log(error);
        }
    }


}


export default appointmentController;