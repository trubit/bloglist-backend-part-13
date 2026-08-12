"use strict";

/** @type {import('sequelize-cli').Migration} */

"use strict";

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("reading_lists", {
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
      blog_id: {
        type: "INTEGER",
        allowNull: false,
        references: { model: "blogs", key: "id" },
      },
      read: {
        type: "BOOLEAN",
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("reading_lists");
  },
};
