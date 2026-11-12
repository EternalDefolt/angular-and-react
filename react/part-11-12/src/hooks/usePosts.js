import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, getPost, getPostsPage, updatePost } from '../api/posts';

export const postKeys = {
  all: ['posts'],
  list: (page) => ['posts', { page }],
  detail: (id) => ['posts', id],
};

export function usePosts(page) {
  return useQuery({
    queryKey: postKeys.list(page),
    queryFn: () => getPostsPage(page),
    placeholderData: (previous) => previous,
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    retry: false,
    enabled: Number.isInteger(id) && id > 0,
  });
}

export function useDeletePost(page) {
  const queryClient = useQueryClient();
  const listKey = postKeys.list(page);

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData(listKey);
      queryClient.setQueryData(listKey, (old) =>
        old ? { ...old, posts: old.posts.filter((p) => p.id !== id) } : old
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const listKey = postKeys.list(1);

  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData(listKey);
      const optimistic = { ...newPost, id: `temp-${Date.now()}`, optimistic: true };
      queryClient.setQueryData(listKey, (old) =>
        old ? { ...old, posts: [optimistic, ...old.posts] } : old
      );
      return { previous };
    },
    onError: (_err, _post, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useUpdatePost(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updatePost(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(postKeys.detail(id), updated);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useDeletePostFromDetail(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}
