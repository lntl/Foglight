'use strict';

/**
 * Evenement.js controller
 *
 * @description: A set of functions called "actions" for managing `Evenement`.
 */

module.exports = {

  /**
   * Retrieve evenement records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.evenement.search(ctx.query);
    } else {
      return strapi.services.evenement.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a evenement record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.evenement.fetch(ctx.params);
  },

  /**
   * Count evenement records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.evenement.count(ctx.query);
  },

  /**
   * Create a/an evenement record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.evenement.add(ctx.request.body);
  },

  /**
   * Update a/an evenement record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.evenement.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an evenement record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.evenement.remove(ctx.params);
  }
};
