const Request = require('../../src/router/Request');
const JsonResponse = require('../../src/router/JsonResponse');
const User = require('../../src/models/User');
const Category = require('../../src/models/Category');
const Post = require('../../src/models/Post');
const PostController = require('../../src/controllers/PostController');
const {
	generateUser,
	generateCategory,
	generatePost,
	generatePostData,
	generateRandomId,
	truncateDatabase,
} = require('../TestHelper');

let user;
let category;
let initialPostId;

beforeEach(async () => {
	initialPostId = generateRandomId();
	await truncateDatabase(['post'], initialPostId);

	user = await generateUser();
	category = await generateCategory(user);
});

test('PostController handled a POST request.', async () => {
	const postData = await generatePostData(null, user, category);
	const request = new Request('POST', '/post', postData);
	const controller = new PostController(request, new JsonResponse());
	const response = await controller.doAction();

	expect(response).toBeInstanceOf(JsonResponse);
	expect(response.getStatusCode()).toBe(200);
	expect(response.getMessage()).toBe('Post created successfully!');
	expect(response.getPayload()).toBeInstanceOf(Post);
	expect(response.getPayload().getId()).toBe(initialPostId);
	expect(response.getPayload().getTitle()).toBe(postData.title);
	expect(response.getPayload().getContent()).toBe(postData.content);
	expect(response.getPayload().getUser()).toBeInstanceOf(User);
	expect(response.getPayload().getUser().getId()).toBe(user.getId());
	expect(response.getPayload().getCategory()).toBeInstanceOf(Category);
	expect(response.getPayload().getCategory().getId()).toBe(category.getId());
});

test('PostController handled a GET request.', async () => {
	const post = await generatePost();
	const request = new Request('GET', `/post/${post.getId()}`);
	const controller = new PostController(request, new JsonResponse());
	const response = await controller.doAction();

	expect(response).toBeInstanceOf(JsonResponse);
	expect(response.getStatusCode()).toBe(200);
	expect(response.getMessage()).toBe('Post retrieved successfully!');
	expect(response.getPayload()).toBeInstanceOf(Post);
	expect(response.getPayload().getId()).toBe(post.getId());
	expect(response.getPayload().getTitle()).toBe(post.getTitle());
	expect(response.getPayload().getContent()).toBe(post.getContent());
	expect(response.getPayload().getUser()).toBeInstanceOf(User);
	expect(response.getPayload().getUser().getId()).toBe(post.getUser().getId());
	expect(response.getPayload().getCategory()).toBeInstanceOf(Category);
	expect(response.getPayload().getCategory().getId()).toBe(post.getCategory().getId());
	expect(response.getPayload().getCreatedAt()).toBeInstanceOf(Date);
	expect(response.getPayload().getEditedAt()).toBeNull();
	expect(response.getPayload().getDeletedAt()).toBeNull();
});

test('PostController threw an exception handling a GET request with non-existant ID.', async () => {
	const postId = generateRandomId();
	const request = new Request('GET', `/post/${postId}`);
	const controller = new PostController(request, new JsonResponse());

	await expect(controller.doAction()).rejects.toMatchObject({
		name: 'PostException',
		message: `Cannot retrieve Post: Post does not exist with ID ${postId}.`,
	});
});

test('PostController handled a PUT request.', async () => {
	const post = await generatePost({ type: 'Text' });
	const { content: newPostContent } = await generatePostData();
	let request = new Request('PUT', `/post/${post.getId()}`, { content: newPostContent });
	let controller = new PostController(request, new JsonResponse());
	let response = await controller.doAction();

	expect(response).toBeInstanceOf(JsonResponse);
	expect(response.getStatusCode()).toBe(200);
	expect(response.getMessage()).toBe('Post updated successfully!');
	expect(response.getPayload()).toBeInstanceOf(Post);
	expect(response.getPayload().getId()).toBe(post.getId());
	expect(response.getPayload().getContent()).toBe(newPostContent);
	expect(response.getPayload().getContent()).not.toBe(post.getContent());
	expect(response.getPayload().getUser()).toBeInstanceOf(User);
	expect(response.getPayload().getUser().getId()).toBe(post.getUser().getId());
	expect(response.getPayload().getCategory()).toBeInstanceOf(Category);
	expect(response.getPayload().getCategory().getId()).toBe(post.getCategory().getId());

	request = new Request('GET', `/post/${post.getId()}`);
	controller = new PostController(request, new JsonResponse());
	response = await controller.doAction();

	expect(response).toBeInstanceOf(JsonResponse);
	expect(response.getStatusCode()).toBe(200);
	expect(response.getPayload().getTitle()).toBe(post.getTitle());
	expect(response.getPayload().getContent()).toBe(newPostContent);
	expect(response.getPayload().getUser()).toBeInstanceOf(User);
	expect(response.getPayload().getUser().getId()).toBe(post.getUser().getId());
	expect(response.getPayload().getCategory()).toBeInstanceOf(Category);
	expect(response.getPayload().getCategory().getId()).toBe(post.getCategory().getId());
	expect(response.getPayload().getCreatedAt()).toBeInstanceOf(Date);
	expect(response.getPayload().getEditedAt()).toBeInstanceOf(Date);
	expect(response.getPayload().getDeletedAt()).toBeNull();
});

test('PostController threw an exception handling a PUT request with non-existant ID.', async () => {
	const postId = generateRandomId();
	const request = new Request('PUT', `/post/${postId}`, { title: 'New Title' });
	const controller = new PostController(request, new JsonResponse());

	await expect(controller.doAction()).rejects.toMatchObject({
		name: 'PostException',
		message: `Cannot update Post: Post does not exist with ID ${postId}.`,
	});
});

test('PostController handled a DELETE request.', async () => {
	const post = await generatePost();
	let request = new Request('DELETE', `/post/${post.getId()}`);
	let controller = new PostController(request, new JsonResponse());
	let response = await controller.doAction();

	expect(response).toBeInstanceOf(JsonResponse);
	expect(response.getStatusCode()).toBe(200);
	expect(response.getMessage()).toBe('Post deleted successfully!');
	expect(response.getPayload()).toBeInstanceOf(Post);
	expect(response.getPayload().getId()).toBe(post.getId());
	expect(response.getPayload().getTitle()).toBe(post.getTitle());
	expect(response.getPayload().getContent()).toBe(post.getContent());
	expect(response.getPayload().getUser()).toBeInstanceOf(User);
	expect(response.getPayload().getUser().getId()).toBe(post.getUser().getId());
	expect(response.getPayload().getCategory()).toBeInstanceOf(Category);
	expect(response.getPayload().getCategory().getId()).toBe(post.getCategory().getId());

	request = new Request('GET', `/post/${post.getId()}`);
	controller = new PostController(request, new JsonResponse());
	response = await controller.doAction();

	expect(response).toBeInstanceOf(JsonResponse);
	expect(response.getStatusCode()).toBe(200);
	expect(response.getPayload().getTitle()).toBe(post.getTitle());
	expect(response.getPayload().getContent()).toBe(post.getContent());
	expect(response.getPayload().getUser()).toBeInstanceOf(User);
	expect(response.getPayload().getUser().getId()).toBe(post.getUser().getId());
	expect(response.getPayload().getCategory()).toBeInstanceOf(Category);
	expect(response.getPayload().getCategory().getId()).toBe(post.getCategory().getId());
	expect(response.getPayload().getCreatedAt()).toBeInstanceOf(Date);
	expect(response.getPayload().getEditedAt()).toBeNull();
	expect(response.getPayload().getDeletedAt()).toBeInstanceOf(Date);
});

test('PostController threw an exception handling a DELETE request with non-existant ID.', async () => {
	const postId = generateRandomId();
	const request = new Request('DELETE', `/post/${postId}`);
	const controller = new PostController(request, new JsonResponse());

	await expect(controller.doAction()).rejects.toMatchObject({
		name: 'PostException',
		message: `Cannot delete Post: Post does not exist with ID ${postId}.`,
	});
});

afterAll(async () => {
	await truncateDatabase();
});
