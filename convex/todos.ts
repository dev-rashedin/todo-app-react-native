import { query, mutation } from './_generated/server';
import { v, ConvexError } from 'convex/values';

// get all tasks
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').order('desc').collect();
    return todos;
  },
});


// create a todo
export const createTodo = mutation({
  args: { title: v.string(), description: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert('todos', {
      title: args.title,
      description: args.description || '',
      isCompleted: false,
    });

    return todoId;
  },
});

// toggling todo
export const toggleTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get('todos', args.id);
    if (!todo) {
      throw new ConvexError('Todo not found');
    }
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

// update todo
export const updateTodo = mutation({
  args: {
    id: v.id('todos'),
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get('todos', args.id);
    if (!todo) {
      throw new ConvexError('Todo not found');
    }

    const update: any = {};

    if (args.title !== undefined && args.title !== todo.title)
      update.title = args.title;
    if (args.description !== undefined && args.description !== todo.description)
      update.description = args.description;

    if (Object.keys(update).length > 0) {
      await ctx.db.patch(args.id, update);
    }
  },
});

// deleting todo
export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// clearing all todos

export const clearAllTodos = mutation({
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").collect();
   

// Deleting all todos
    for (const todo of todos) {
     await ctx.db.delete(todo._id);
    }
    return {deleteCount: todos.length};
  },
});