// import {
//   makeAuthGETAPIRequest,
//   makeAuthPOSTAPIRequest,
//   makeAuthPUTAPIRequest,
//   makeAuthDELETEAPIRequest,
// } from './request';

// /**
//  * Fetch user projects
//  * @returns {AuthGETAPIRequest} AuthGETAPIRequest
//  */
// export function getProjects() {
//   return makeAuthGETAPIRequest('/projects');
// }

// /**
//  * Fetch one project
//  * @param {string} projectId - ID of specific project to be fetched e.g. 60cb5b03ed5c49216d43bbd1
//  * @returns {AuthGETAPIRequest} AuthGETAPIRequest
//  */
// export function getProject(projectId) {
//   return makeAuthGETAPIRequest(`/projects/${projectId}`);
// }

// /**
//  * Create a new project
//  * @param {string} projectName - Name of the project to be created. If not supplied, defaults to "Untitled Project"
//  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
//  */
// export function createNewProject(projectName = 'Untitled Project') {
//   return makeAuthPOSTAPIRequest('/projects', {name: projectName});
// }

// /**
//  * Duplicate an existing project
//  * @param {string} projectId - ID of project to be duplicated e.g. 60cb5b03ed5c49216d43bbd1
//  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
//  */
// export function duplicateProject(projectId) {
//   return makeAuthPOSTAPIRequest(`/projects/duplicate/${projectId}`);
// }

// /**
//  * Move project to an existing folder
//  * @param {string} projectId - ID of project to be moved e.g. 60cb5b03ed5c49216d43bbd1
//  * @param {string} folderId - ID of folder where project is to be moved to e.g. 60b0bd1ae27f0b071d43322a
//  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
//  */
// export function moveProjectToFolder(projectId, folderId) {
//   return makeAuthPOSTAPIRequest(`/projects/${projectId}/move`, {
//     folderId: folderId,
//   });
// }

// /**
//  * Update project
//  * @param {string} projectId - ID of project to be updated e.g. 60b03c09b1ba080e70e03345
//  * @param {string} newName - New name of project to be updated e.g. "Project Name"
//  * @returns {AuthPUTAPIRequest} AuthPUTAPIRequest
//  */
// export function updateProject(projectId, newName = '') {
//   return makeAuthPUTAPIRequest(`/projects/${projectId}`, {name: newName});
// }

// /**
//  * Delete project
//  * @param {string} projectId - ID of project to be deleted e.g. 60b03c09b1ba080e70e03345
//  * @returns {AuthDELETEAPIRequest} AuthDELETEAPIRequest
//  */
// export function deleteProject(projectId) {
//   return makeAuthDELETEAPIRequest(`/projects/${projectId}`);
// }

// /**
//  * Fetch user project folders
//  * @returns {AuthGETAPIRequest} AuthGETAPIRequest
//  */
// export function getProjectFolders() {
//   return makeAuthGETAPIRequest('/projects/folders');
// }

// /**
//  * Fetch projects from a specified folder
//  * @param {string} folderId - ID of project folder from which projects are to be retrieved e.g. 60b0bd1ae27f0b071d43322a
//  * @returns {AuthGETAPIRequest} AuthGETAPIRequest
//  */
// export function getFolderProjects(folderId) {
//   return makeAuthGETAPIRequest(`/projects/folders/${folderId}`);
// }

// /**
//  * Create a new folder
//  * @param {string} folderName - Name of the folder to be created. If not supplied, defaults to "Untitled Folder"
//  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
//  */
// export function createNewFolder(folderName = 'Untitled Folder') {
//   return makeAuthPOSTAPIRequest('/projects/folders', {name: folderName});
// }

// /**
//  * Update folder
//  * @param {string} folderId - ID of folder to be updated e.g. 60b0bd1ae27f0b071d43322a
//  * @param {string} newName - New name of project to be updated e.g. "Folder Name"
//  * @returns {AuthPUTAPIRequest} AuthPUTAPIRequest
//  */
// export function updateFolder(folderId, newName = '') {
//   return makeAuthPUTAPIRequest(`/projects/folders/${folderId}`, {
//     name: newName,
//   });
// }

// /**
//  * Delete folder
//  * @param {string} folderId - ID of folder to be deleted e.g. 60b0cea7961f9a0bd89209d3
//  * @returns {AuthDELETEAPIRequest} AuthDELETEAPIRequest
//  */
// export function deleteFolder(folderId) {
//   return makeAuthDELETEAPIRequest(`/projects/folders/${folderId}`);
// }
