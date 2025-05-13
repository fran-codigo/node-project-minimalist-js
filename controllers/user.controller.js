import { prisma } from "../config/prisma.js";
import { handleNotFoundError } from "../utils/index.js";

export const index = async (req, res) => {
    try {
        const { page = 1, perPage = 10 } = req.query;
        const skip = (+page - 1) * +perPage;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: +perPage
            }),
            prisma.user.count()
        ]);

        return res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / +perPage)
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error " + error.message
        })
    }
}

export const store = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: "El usuario ya existe",
                }]
            })
        }

        await prisma.user.create({
            data: {
                name,
                email
            }
        })

        return res.status(201).json({
            success: true,
            message: "El usuario se ha creado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error " + error.message
        })
    }
}

export const show = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: +id
            }
        })

        if (!user) {
            return handleNotFoundError("El usuario no existe", res);
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error " + error.message
        })
    }
}

export const update = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id
            }
        })

        if (!user) {
            return handleNotFoundError("El usuario no existe", res);
        }

        const { name, email } = req.body;

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userExists && userExists.id !== +id) {
            return res.status(400).json({
                success: false,
                errors: [{
                    msg: "El usuario ya existe",
                }]
            })
        }

        const userUpdated = await prisma.user.update({
            where: {
                id: +id
            },
            data: {
                name,
                email
            }
        })

        return res.status(200).json({
            success: true,
            message: "El usuario se ha actualizado correctamente",
            data: userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error " + error.message
        })
    }
}

export const changeStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id
            }
        })

        if (!user) {
            return handleNotFoundError("El usuario no existe", res);
        }

        const userUpdated = await prisma.user.update({
            where: {
                id: +id
            },
            data: {
                isActive: !user.isActive
            }
        })

        return res.status(200).json({
            success: true,
            message: "El estado del usuario se ha actualizado correctamente",
            data: userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error " + error.message
        })
    }
}

export const destroy = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id
            }
        })

        if (!user) {
            return handleNotFoundError("El usuario no existe", res);
        }

        await prisma.user.delete({
            where: {
                id: +id
            }
        })

        return res.status(204).json({
            success: true,
            message: "El usuario se ha eliminado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error " + error.message
        })
    }

}