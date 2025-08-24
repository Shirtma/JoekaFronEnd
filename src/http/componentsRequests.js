// import {
//   makeAuthDELETEAPIRequest,
//   makeAuthGETAPIRequest,
//   makeAuthPOSTAPIRequest,
//   makeAuthPUTAPIRequest,
// } from './request';

// /**
//  * Fetch all components
//  * @returns {AuthGETAPIRequest} AuthGETAPIRequest
//  */
// export function getAllComponents() {
//   return makeAuthGETAPIRequest('/components');
// }

// /**
//  * Fetch all items in a specified component
//  * @param {string} componentId - ID of component from which items are to be retrieved e.g. 60853648926e135d69119d20
//  * @returns {AuthGETAPIRequest} AuthGETAPIRequest
//  */
// export function getComponentItems(componentId) {
//   return makeAuthGETAPIRequest(`/components/${componentId}/items`);
// }

// /**
//  * Add a new component to the current project
//  * @param {string} componentId - ID of component to be created (from the list of component items)
//  * @param {object} componentData - Changes to be added to the component as it's being added
//  * @param {number} componentIndex - Index of component in the component stack
//  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
//  */
// export function addComponentToProject(
//   componentId,
//   componentData = {},
//   componentIndex = 0,
// ) {
//   return makeAuthPOSTAPIRequest(`/projects/${componentId}/components`, {
//     componentId: componentId,
//     data: componentData,
//     index: componentIndex,
//   });
// }

// /**
//  * Duplicate a component in a project
//  * @param {string} projectId - ID of project that user is working on
//  * @param {string} componentId - ID of component to be duplicated
//  * @param {number} componentIndex - Index of component in the component stack
//  * @param {object} componentData - Changes to be added to the component during duplication
//  * @returns {AuthPOSTAPIRequest} AuthPOSTAPIRequest
//  */
// export function duplicateProjectComponent(
//   projectId,
//   componentId,
//   componentIndex,
//   componentData,
// ) {
//   return makeAuthPOSTAPIRequest(
//     `/projects/${projectId}/duplicate/components/${componentId}`,
//     {
//       componentId: componentId,
//       data: componentData,
//       index: componentIndex,
//     },
//   );
// }

// /**
//  * Update a component in a project
//  * @param {string} projectId - ID of project that user is working on
//  * @param {string} componentId - ID of component to be deleted
//  * @param {number} componentIndex - Index of component in the component stack
//  * @param {object} componentData - Data in the update of the component
//  * @returns {makeAuthPUTAPIRequest} makeAuthPUTAPIRequest
//  */
// export function updateProjectComponent(
//   projectId,
//   componentId,
//   componentIndex,
//   componentData,
// ) {
//   return makeAuthPUTAPIRequest(
//     `/projects/${projectId}/components/${componentId}`,
//     {
//       componentId: componentId,
//       data: componentData,
//       index: componentIndex,
//     },
//   );
// }

// /**
//  * Delete a component in a project
//  * @param {string} projectId - ID of project that user is working in
//  * @param {string} componentId - ID of component to be deleted
//  * @returns {makeAuthDELETEAPIRequest} makeAuthDELETEAPIRequest
//  */
// export function deleteProjectComponent(projectId, componentId) {
//   return makeAuthDELETEAPIRequest(
//     `/projects/${projectId}/components/${componentId}`,
//   );
// }
