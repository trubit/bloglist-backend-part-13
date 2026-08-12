"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: "INTEGER",
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      token: {
        type: "TEXT",
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: "TIMESTAMP",
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
  },
};
