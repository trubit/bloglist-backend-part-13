"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("users", {
      id: {
        type: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: "TEXT",
        unique: true,
        allowNull: false,
      },
      name: {
        type: "TEXT",
        allowNull: false,
      },
      password_hash: {
        type: "TEXT",
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

    await queryInterface.createTable("blogs", {
      id: {
        type: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: "TEXT",
      },
      url: {
        type: "TEXT",
        allowNull: false,
      },
      title: {
        type: "TEXT",
        allowNull: false,
      },
      likes: {
        type: "INTEGER",
        defaultValue: 0,
      },
      user_id: {
        type: "INTEGER",
        allowNull: false,
        references: { model: "users", key: "id" },
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
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("users");
  },
};
