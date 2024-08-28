// Obtener todos los autores
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener autores', error });
  }
};

// Crear un nuevo autor
const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const newAuthor = await Author.create({ name });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear autor', error });
  }
};

// Obtener un autor por ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener autor', error });
  }
};

// Actualizar un autor por ID
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    author.name = name;
    await author.save();
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar autor', error });
  }
};

// Eliminar un autor por ID
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    await author.destroy();
    res.json({ message: 'Autor eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar autor', error });
  }
};

module.exports = {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};
