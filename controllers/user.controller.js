export const index = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Bienvenido a la API",
  });
};
