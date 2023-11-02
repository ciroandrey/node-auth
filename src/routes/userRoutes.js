const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { requireAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'  # Use "#" para referenciar componentes/schemas
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Use "#" para referenciar componentes/schemas
 *       400:
 *         description: Erro ao criar o usuário
 */
router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'  # Referência direta ao esquema do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Referência direta ao esquema do usuário
 *       400:
 *         description: Erro ao atualizar o usuário
 */
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await userService.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Referência direta ao esquema do usuário
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Erro ao excluir o usuário
 * 
 */
router.delete('/:id', requireAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await userService.deleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

module.exports = router;