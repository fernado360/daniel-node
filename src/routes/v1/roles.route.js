const express = require('express');
const { updateUserById } = require('../../services/user.service');

const router = express.Router();

router.post('/set-user-as-admin', async (req, res) => {
  const { id } = req.body;
  const data = await updateUserById(id, {
    role: 'admin',
  });

  res.send(data);
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles management and retrieval
 */

/**
 * @swagger
 * /set-user-as-admin:
 *   post:
 *     summary: set a user as admin
 *     description: Only admins can create other users.
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *             example:
 *               id: sjdjjdjsjdj
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
